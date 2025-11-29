
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context';
import { MapPin, ArrowRight, ArrowLeft, Search, ChevronDown, Share2, Check, Star, X, RotateCcw, MoreVertical, Flag, Mail, Facebook, Twitter, Linkedin, Link as LinkIcon, Briefcase, Clock, DollarSign, CheckCircle2, FileText, Trash2, UploadCloud, Edit2, ChevronLeft, Globe, Calendar, Save, HelpCircle, ChevronRight, Send, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
// @google/genai Coding Guidelines: DO add comment above each fix.
// Imported `Job` type to resolve 'Cannot find name 'Job'' errors.
import { Job } from '../types';

const COUNTRY_CODES = [
  { name: 'Afghanistan', flag: '🇦🇫', code: 'AF', dial_code: '+93' },
  { name: 'Åland Islands', flag: '🇦🇽', code: 'AX', dial_code: '+358' },
  { name: 'Albania', flag: '🇦🇱', code: 'AL', dial_code: '+355' },
  { name: 'Algeria', flag: '🇩🇿', code: 'DZ', dial_code: '+213' },
  { name: 'American Samoa', flag: '🇦🇸', code: 'AS', dial_code: '+1684' },
  { name: 'Andorra', flag: '🇦🇩', code: 'AD', dial_code: '+376' },
  { name: 'Angola', flag: '🇦🇴', code: 'AO', dial_code: '+244' },
  { name: 'Anguilla', flag: '🇦🇮', code: 'AI', dial_code: '+1264' },
  { name: 'Antarctica', flag: '🇦🇶', code: 'AQ', dial_code: '+672' },
  { name: 'Antigua and Barbuda', flag: '🇦🇬', code: 'AG', dial_code: '+1268' },
  { name: 'Argentina', flag: '🇦🇷', code: 'AR', dial_code: '+54' },
  { name: 'Armenia', flag: '🇦🇲', code: 'AM', dial_code: '+374' },
  { name: 'Aruba', flag: '🇦🇼', code: 'AW', dial_code: '+297' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU', dial_code: '+61' },
  { name: 'Austria', flag: '🇦🇹', code: 'AT', dial_code: '+43' },
  { name: 'Azerbaijan', flag: '🇦🇿', code: 'AZ', dial_code: '+994' },
  { name: 'Bahamas', flag: '🇧🇸', code: 'BS', dial_code: '+1242' },
  { name: 'Bahrain', flag: '🇧🇭', code: 'BH', dial_code: '+973' },
  { name: 'Bangladesh', flag: '🇧🇩', code: 'BD', dial_code: '+880' },
  { name: 'Barbados', flag: '🇧🇧', code: 'BB', dial_code: '+1246' },
  { name: 'Belarus', flag: '🇧🇾', code: 'BY', dial_code: '+375' },
  { name: 'Belgium', flag: '🇧🇪', code: 'BE', dial_code: '+32' },
  { name: 'Belize', flag: '🇧🇿', code: 'BZ', dial_code: '+501' },
  { name: 'Benin', flag: '🇧🇯', code: 'BJ', dial_code: '+229' },
  { name: 'Bermuda', flag: '🇧🇲', code: 'BM', dial_code: '+1441' },
  { name: 'Bhutan', flag: '🇧🇹', code: 'BT', dial_code: '+975' },
  { name: 'Bolivia', flag: '🇧🇴', code: 'BO', dial_code: '+591' },
  { name: 'Bosnia and Herzegovina', flag: '🇧🇦', code: 'BA', dial_code: '+387' },
  { name: 'Botswana', flag: '🇧🇼', code: 'BW', dial_code: '+267' },
  { name: 'Brazil', flag: '🇧🇷', code: 'BR', dial_code: '+55' },
  { name: 'British Indian Ocean Territory', flag: '🇮🇴', code: 'IO', dial_code: '+246' },
  { name: 'Brunei Darussalam', flag: '🇧🇳', code: 'BN', dial_code: '+673' },
  { name: 'Bulgaria', flag: '🇧🇬', code: 'BG', dial_code: '+359' },
  { name: 'Burkina Faso', flag: '🇧🇫', code: 'BF', dial_code: '+226' },
  { name: 'Burundi', flag: '🇧🇮', code: 'BI', dial_code: '+257' },
  { name: 'Cambodia', flag: '🇰🇭', code: 'KH', dial_code: '+855' },
  { name: 'Cameroon', flag: '🇨🇲', code: 'CM', dial_code: '+237' },
  { name: 'Canada', flag: '🇨🇦', code: '+1' },
  { name: 'Cape Verde', flag: '🇨🇻', code: 'CV', dial_code: '+238' },
  { name: 'Cayman Islands', flag: '🇰🇾', code: 'KY', dial_code: '+345' },
  { name: 'Central African Republic', flag: '🇨🇫', code: 'CF', dial_code: '+236' },
  { name: 'Chad', flag: '🇹🇩', code: 'TD', dial_code: '+235' },
  { name: 'Chile', flag: '🇨🇱', code: 'CL', dial_code: '+56' },
  { name: 'China', flag: '🇨🇳', code: 'CN', dial_code: '+86' },
  { name: 'Christmas Island', flag: '🇨🇽', code: 'CX', dial_code: '+61' },
  { name: 'Cocos (Keeling) Islands', flag: '🇨🇨', code: 'CC', dial_code: '+61' },
  { name: 'Colombia', flag: '🇨🇴', code: 'CO', dial_code: '+57' },
  { name: 'Comoros', flag: '🇰🇲', code: 'KM', dial_code: '+269' },
  { name: 'Congo', flag: '🇨🇬', code: 'CG', dial_code: '+242' },
  { name: 'Congo, The Democratic Republic of the', flag: '🇨🇩', code: 'CD', dial_code: '+243' },
  { name: 'Cook Islands', flag: '🇨🇰', code: 'CK', dial_code: '+682' },
  { name: 'Costa Rica', flag: '🇨🇷', code: 'CR', dial_code: '+506' },
  { name: 'Cote d\'Ivoire', flag: '🇨🇮', code: 'CI', dial_code: '+225' },
  { name: 'Croatia', flag: '🇭🇷', code: 'HR', dial_code: '+385' },
  { name: 'Cuba', flag: '🇨🇺', code: 'CU', dial_code: '+53' },
  { name: 'Cyprus', flag: '🇨🇾', code: 'CY', dial_code: '+357' },
  { name: 'Czech Republic', flag: '🇨🇿', code: 'CZ', dial_code: '+420' },
  { name: 'Denmark', flag: '🇩🇰', code: 'DK', dial_code: '+45' },
  { name: 'Djibouti', flag: '🇩🇯', code: 'DJ', dial_code: '+253' },
  { name: 'Dominica', flag: '🇩🇲', code: 'DM', dial_code: '+1767' },
  { name: 'Dominican Republic', flag: '🇩🇴', code: 'DO', dial_code: '+1849' },
  { name: 'Ecuador', flag: '🇪🇨', code: 'EC', dial_code: '+593' },
  { name: 'Egypt', flag: '🇪🇬', code: 'EG', dial_code: '+20' },
  { name: 'El Salvador', flag: '🇸🇻', code: 'SV', dial_code: '+503' },
  { name: 'Equatorial Guinea', flag: '🇬🇶', code: 'GQ', dial_code: '+240' },
  { name: 'Eritrea', flag: '🇪🇷', code: 'ER', dial_code: '+291' },
  { name: 'Estonia', flag: '🇪🇪', code: 'EE', dial_code: '+372' },
  { name: 'Ethiopia', flag: '🇪🇹', code: 'ET', dial_code: '+251' },
  { name: 'Falkland Islands (Malvinas)', flag: '🇫🇰', code: 'FK', dial_code: '+500' },
  { name: 'Faroe Islands', flag: '🇫🇴', code: 'FO', dial_code: '+298' },
  { name: 'Fiji', flag: '🇫🇯', code: 'FJ', dial_code: '+679' },
  { name: 'Finland', flag: '🇫🇮', code: 'FI', dial_code: '+358' },
  { name: 'France', flag: '🇫🇷', code: 'FR', dial_code: '+33' },
  { name: 'French Guiana', flag: '🇬🇫', code: 'GF', dial_code: '+594' },
  { name: 'French Polynesia', flag: '🇵🇫', code: 'PF', dial_code: '+689' },
  { name: 'Gabon', flag: '🇬🇦', code: 'GA', dial_code: '+241' },
  { name: 'Gambia', flag: '🇬🇲', code: 'GM', dial_code: '+220' },
  { name: 'Georgia', flag: '🇬🇪', code: 'GE', dial_code: '+995' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE', dial_code: '+49' },
  { name: 'Ghana', flag: '🇬🇭', code: 'GH', dial_code: '+233' },
  { name: 'Gibraltar', flag: '🇬🇮', code: 'GI', dial_code: '+350' },
  { name: 'Greece', flag: '🇬🇷', code: 'GR', dial_code: '+30' },
  { name: 'Greenland', flag: '🇬🇱', code: 'GL', dial_code: '+299' },
  { name: 'Grenada', flag: '🇬🇩', code: 'GD', dial_code: '+1473' },
  { name: 'Guadeloupe', flag: '🇬🇵', code: 'GP', dial_code: '+590' },
  { name: 'Guam', flag: '🇬🇺', code: 'GU', dial_code: '+1671' },
  { name: 'Guatemala', flag: '🇬🇹', code: 'GT', dial_code: '+502' },
  { name: 'Guernsey', flag: '🇬🇬', code: 'GG', dial_code: '+44' },
  { name: 'Guinea', flag: '🇬🇳', code: 'GN', dial_code: '+224' },
  { name: 'Guinea-Bissau', flag: '🇬🇼', code: 'GW', dial_code: '+245' },
  { name: 'Guyana', flag: '🇬🇾', code: 'GY', dial_code: '+592' },
  { name: 'Haiti', flag: '🇭🇹', code: 'HT', dial_code: '+509' },
  { name: 'Holy See (Vatican City State)', flag: '🇻🇦', code: 'VA', dial_code: '+379' },
  { name: 'Honduras', flag: '🇭🇳', code: 'HN', dial_code: '+504' },
  { name: 'Hong Kong', flag: '🇭🇰', code: 'HK', dial_code: '+852' },
  { name: 'Hungary', flag: '🇭🇺', code: 'HU', dial_code: '+36' },
  { name: 'Iceland', flag: '🇮🇸', code: 'IS', dial_code: '+354' },
  { name: 'India', flag: '🇮🇳', code: 'IN', dial_code: '+91' },
  { name: 'Indonesia', flag: '🇮🇩', code: 'ID', dial_code: '+62' },
  { name: 'Iran, Islamic Republic of', flag: '🇮🇷', code: 'IR', dial_code: '+98' },
  { name: 'Iraq', flag: '🇮🇶', code: 'IQ', dial_code: '+964' },
  { name: 'Ireland', flag: '🇮🇪', code: 'IE', dial_code: '+353' },
  { name: 'Isle of Man', flag: '🇮🇲', code: 'IM', dial_code: '+44' },
  { name: 'Israel', flag: '🇮🇱', code: 'IL', dial_code: '+972' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT', dial_code: '+39' },
  { name: 'Jamaica', flag: '🇯🇲', code: 'JM', dial_code: '+1876' },
  { name: 'Japan', flag: '🇯🇵', code: 'JP', dial_code: '+81' },
  { name: 'Jersey', flag: '🇯🇪', code: 'JE', dial_code: '+44' },
  { name: 'Jordan', flag: '🇯🇴', code: 'JO', dial_code: '+962' },
  { name: 'Kazakhstan', flag: '🇰🇿', code: 'KZ', dial_code: '+77' },
  { name: 'Kenya', flag: '🇰🇪', code: 'KE', dial_code: '+254' },
  { name: 'Kiribati', flag: '🇰🇮', code: 'KI', dial_code: '+686' },
  { name: 'Korea, Democratic People\'s Republic of', flag: '🇰🇵', code: 'KP', dial_code: '+850' },
  { name: 'Korea, Republic of', flag: '🇰🇷', code: 'KR', dial_code: '+82' },
  { name: 'Kuwait', flag: '🇰🇼', code: 'KW', dial_code: '+965' },
  { name: 'Kyrgyzstan', flag: '🇰🇬', code: 'KG', dial_code: '+996' },
  { name: 'Lao People\'s Democratic Republic', flag: '🇱🇦', code: 'LA', dial_code: '+856' },
  { name: 'Latvia', flag: '🇱🇻', code: 'LV', dial_code: '+371' },
  { name: 'Lebanon', flag: '🇱🇧', code: 'LB', dial_code: '+961' },
  { name: 'Lesotho', flag: '🇱🇸', code: 'LS', dial_code: '+266' },
  { name: 'Liberia', flag: '🇱🇷', code: 'LR', dial_code: '+231' },
  { name: 'Libyan Arab Jamahiriya', flag: '🇱🇾', code: 'LY', dial_code: '+218' },
  { name: 'Liechtenstein', flag: '🇱🇮', code: 'LI', dial_code: '+423' },
  { name: 'Lithuania', flag: '🇱🇹', code: 'LT', dial_code: '+370' },
  { name: 'Luxembourg', flag: '🇱🇺', code: 'LU', dial_code: '+352' },
  { name: 'Macao', flag: '🇲🇴', code: 'MO', dial_code: '+853' },
  { name: 'Macedonia, The Former Yugoslav Republic of', flag: '🇲🇰', code: 'MK', dial_code: '+389' },
  { name: 'Madagascar', flag: '🇲🇬', code: 'MG', dial_code: '+261' },
  { name: 'Malawi', flag: '🇲🇼', code: 'MW', dial_code: '+265' },
  { name: 'Malaysia', flag: '🇲🇾', code: 'MY', dial_code: '+60' },
  { name: 'Maldives', flag: '🇲🇻', code: 'MV', dial_code: '+960' },
  { name: 'Mali', flag: '🇲🇱', code: 'ML', dial_code: '+223' },
  { name: 'Malta', flag: '🇲🇹', code: 'MT', dial_code: '+356' },
  { name: 'Marshall Islands', flag: '🇲🇭', code: 'MH', dial_code: '+692' },
  { name: 'Martinique', flag: '🇲🇶', code: 'MQ', dial_code: '+596' },
  { name: 'Mauritania', flag: '🇲🇷', code: 'MR', dial_code: '+222' },
  { name: 'Mauritius', flag: '🇲🇺', code: 'MU', dial_code: '+230' },
  { name: 'Mayotte', flag: '🇾🇹', code: 'YT', dial_code: '+262' },
  { name: 'Mexico', flag: '🇲🇽', code: 'MX', dial_code: '+52' },
  { name: 'Micronesia, Federated States of', flag: '🇫🇲', code: 'FM', dial_code: '+691' },
  { name: 'Moldova, Republic of', flag: '🇲🇩', code: 'MD', dial_code: '+373' },
  { name: 'Monaco', flag: '🇲🇨', code: 'MC', dial_code: '+377' },
  { name: 'Mongolia', flag: '🇲🇳', code: 'MN', dial_code: '+976' },
  { name: 'Montenegro', flag: '🇲🇪', code: 'ME', dial_code: '+382' },
  { name: 'Montserrat', flag: '🇲🇸', code: 'MS', dial_code: '+1664' },
  { name: 'Morocco', flag: '🇲🇦', code: 'MA', dial_code: '+212' },
  { name: 'Mozambique', flag: '🇲🇿', code: 'MZ', dial_code: '+258' },
  { name: 'Myanmar', flag: '🇲🇲', code: 'MM', dial_code: '+95' },
  { name: 'Namibia', flag: '🇳🇦', code: 'NA', dial_code: '+264' },
  { name: 'Nauru', flag: '🇳🇷', code: 'NR', dial_code: '+674' },
  { name: 'Nepal', flag: '🇳🇵', code: 'NP', dial_code: '+977' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL', dial_code: '+31' },
  { name: 'Netherlands Antilles', flag: '🇦🇳', code: 'AN', dial_code: '+599' },
  { name: 'New Caledonia', flag: '🇳🇨', code: 'NC', dial_code: '+687' },
  { name: 'New Zealand', flag: '🇳🇿', code: 'NZ', dial_code: '+64' },
  { name: 'Nicaragua', flag: '🇳🇮', code: 'NI', dial_code: '+505' },
  { name: 'Niger', flag: '🇳🇪', code: 'NE', dial_code: '+227' },
  { name: 'Nigeria', flag: '🇳🇬', code: 'NG', dial_code: '+234' },
  { name: 'Niue', flag: '🇳🇺', code: 'NU', dial_code: '+683' },
  { name: 'Norfolk Island', flag: '🇳🇫', code: 'NF', dial_code: '+672' },
  { name: 'Northern Mariana Islands', flag: '🇲🇵', code: 'MP', dial_code: '+1670' },
  { name: 'Norway', flag: '🇳🇴', code: 'NO', dial_code: '+47' },
  { name: 'Oman', flag: '🇴🇲', code: 'OM', dial_code: '+968' },
  { name: 'Pakistan', flag: '🇵🇰', code: 'PK', dial_code: '+92' },
  { name: 'Palau', flag: '🇵🇼', code: 'PW', dial_code: '+680' },
  { name: 'Palestinian Territory, Occupied', flag: '🇵🇸', code: 'PS', dial_code: '+970' },
  { name: 'Panama', flag: '🇵🇦', code: 'PA', dial_code: '+507' },
  { name: 'Papua New Guinea', flag: '🇵🇬', code: 'PG', dial_code: '+675' },
  { name: 'Paraguay', flag: '🇵🇾', code: 'PY', dial_code: '+595' },
  { name: 'Peru', flag: '🇵🇪', code: 'PE', dial_code: '+51' },
  { name: 'Philippines', flag: '🇵🇭', code: 'PH', dial_code: '+63' },
  { name: 'Pitcairn', flag: '🇵🇳', code: 'PN', dial_code: '+872' },
  { name: 'Poland', flag: '🇵🇱', code: 'PL', dial_code: '+48' },
  { name: 'Portugal', flag: '🇵🇹', code: 'PT', dial_code: '+351' },
  { name: 'Puerto Rico', flag: '🇵🇷', code: 'PR', dial_code: '+1939' },
  { name: 'Qatar', flag: '🇶🇦', code: 'QA', dial_code: '+974' },
  { name: 'Romania', flag: '🇷🇴', code: 'RO', dial_code: '+40' },
  { name: 'Russia', flag: '🇷🇺', code: 'RU', dial_code: '+7' },
  { name: 'Rwanda', flag: '🇷🇼', code: 'RW', dial_code: '+250' },
  { name: 'Reunion', flag: '🇷🇪', code: 'RE', dial_code: '+262' },
  { name: 'Saint Barthelemy', flag: '🇧🇱', code: 'BL', dial_code: '+590' },
  { name: 'Saint Helena, Ascension and Tristan Da Cunha', flag: '🇸🇭', code: 'SH', dial_code: '+290' },
  { name: 'Saint Kitts and Nevis', flag: '🇰🇳', code: 'KN', dial_code: '+1869' },
  { name: 'Saint Lucia', flag: '🇱🇨', code: 'LC', dial_code: '+1758' },
  { name: 'Saint Martin', flag: '🇲🇫', code: 'MF', dial_code: '+590' },
  { name: 'Saint Pierre and Miquelon', flag: '🇵🇲', code: 'PM', dial_code: '+508' },
  { name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', code: 'VC', dial_code: '+1784' },
  { name: 'Samoa', flag: '🇼🇸', code: 'WS', dial_code: '+685' },
  { name: 'San Marino', flag: '🇸🇲', code: 'SM', dial_code: '+378' },
  { name: 'Sao Tome and Principe', flag: '🇸🇹', code: 'ST', dial_code: '+239' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: 'SA', dial_code: '+966' },
  { name: 'Senegal', flag: '🇸🇳', code: 'SN', dial_code: '+221' },
  { name: 'Serbia', flag: '🇷🇸', code: 'RS', dial_code: '+381' },
  { name: 'Seychelles', flag: '🇸🇨', code: 'SC', dial_code: '+248' },
  { name: 'Sierra Leone', flag: '🇸🇱', code: 'SL', dial_code: '+232' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG', dial_code: '+65' },
  { name: 'Slovakia', flag: '🇸🇰', code: 'SK', dial_code: '+421' },
  { name: 'Slovenia', flag: '🇸🇮', code: 'SI', dial_code: '+386' },
  { name: 'Solomon Islands', flag: '🇸🇧', code: 'SB', dial_code: '+677' },
  { name: 'Somalia', flag: '🇸🇴', code: 'SO', dial_code: '+252' },
  { name: 'South Africa', flag: '🇿🇦', code: 'ZA', dial_code: '+27' },
  { name: 'South Georgia and the South Sandwich Islands', flag: '🇬🇸', code: 'GS', dial_code: '+500' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES', dial_code: '+34' },
  { name: 'Sri Lanka', flag: '🇱🇰', code: 'LK', dial_code: '+94' },
  { name: 'Sudan', flag: '🇸🇩', code: 'SD', dial_code: '+249' },
  { name: 'Suriname', flag: '🇸🇷', code: 'SR', dial_code: '+597' },
  { name: 'Svalbard and Jan Mayen', flag: '🇸🇯', code: 'SJ', dial_code: '+47' },
  { name: 'Swaziland', flag: '🇸🇿', code: 'SZ', dial_code: '+268' },
  { name: 'Sweden', flag: '🇸🇪', code: 'SE', dial_code: '+46' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'CH', dial_code: '+41' },
  { name: 'Syrian Arab Republic', flag: '🇸🇾', code: 'SY', dial_code: '+963' },
  { name: 'Taiwan, Province of China', flag: '🇹🇼', code: 'TW', dial_code: '+886' },
  { name: 'Tajikistan', flag: '🇹🇯', code: 'TJ', dial_code: '+992' },
  { name: 'Tanzania, United Republic of', flag: '🇹🇿', code: 'TZ', dial_code: '+255' },
  { name: 'Thailand', flag: '🇹🇭', code: 'TH', dial_code: '+66' },
  { name: 'Timor-Leste', flag: '🇹🇱', code: 'TL', dial_code: '+670' },
  { name: 'Togo', flag: '🇹🇬', code: 'TG', dial_code: '+228' },
  { name: 'Tokelau', flag: '🇹🇰', code: 'TK', dial_code: '+690' },
  { name: 'Tonga', flag: '🇹🇴', code: 'TO', dial_code: '+676' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹', code: 'TT', dial_code: '+1868' },
  { name: 'Tunisia', flag: '🇹🇳', code: 'TN', dial_code: '+216' },
  { name: 'Turkey', flag: '🇹🇷', code: 'TR', dial_code: '+90' },
  { name: 'Turkmenistan', flag: '🇹🇲', code: 'TM', dial_code: '+993' },
  { name: 'Turks and Caicos Islands', flag: '🇹🇨', code: 'TC', dial_code: '+1649' },
  { name: 'Tuvalu', flag: '🇹🇻', code: 'TV', dial_code: '+688' },
  { name: 'Uganda', flag: '🇺🇬', code: 'UG', dial_code: '+256' },
  { name: 'Ukraine', flag: '🇺🇦', code: 'UA', dial_code: '+380' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', dial_code: '+971' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dial_code: '+44' },
  { name: 'United States', flag: '🇺🇸', code: 'US', dial_code: '+1' },
  { name: 'Uruguay', flag: '🇺🇾', code: 'UY', dial_code: '+598' },
  { name: 'Uzbekistan', flag: '🇺🇿', code: 'UZ', dial_code: '+998' },
  { name: 'Vanuatu', flag: '🇻🇺', code: 'VU', dial_code: '+678' },
  { name: 'Venezuela, Bolivarian Republic of', flag: '🇻🇪', code: 'VE', dial_code: '+58' },
  { name: 'Viet Nam', flag: '🇻🇳', code: 'VN', dial_code: '+84' },
  { name: 'Virgin Islands, British', flag: '🇻🇬', code: 'VG', dial_code: '+1284' },
  { name: 'Virgin Islands, U.S.', flag: '🇻🇮', code: 'VI', dial_code: '+1340' },
  { name: 'Wallis and Futuna', flag: '🇼🇫', code: 'WF', dial_code: '+681' },
  { name: 'Yemen', flag: '🇾🇪', code: 'YE', dial_code: '+967' },
  { name: 'Zambia', flag: '🇿🇲', code: 'ZM', dial_code: '+260' },
  { name: 'Zimbabwe', flag: '🇿🇼', code: 'ZW', dial_code: '+263' }
];

const FilterPill: React.FC<{ label: string, options: string[], onChange: (val: any) => void, valueMap?: any }> = ({ label, options, onChange, valueMap }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) setIsOpen(false);
        };
        // Close dropdown on scroll
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isOpen]);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // Calculate fixed position to escape overflow clipping
            setCoords({
                top: rect.bottom + 8,
                left: rect.left,
            });
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative shrink-0">
            <button 
                ref={buttonRef}
                onClick={toggle}
                className={`bg-transparent border border-white/30 text-white hover:bg-white/10 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap w-max min-w-[120px] justify-between ${isOpen ? 'bg-white/10' : ''}`}
            >
                {label} <ChevronDown size={14} className={`transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div 
                        style={{ top: coords.top, left: coords.left }}
                        className="fixed bg-white rounded-xl shadow-2xl py-2 z-50 animate-[fadeIn_0.1s_ease-out] text-gray-800 border border-gray-100 mt-1 max-h-64 overflow-y-auto custom-scroll w-max min-w-[160px]"
                    >
                        {options.map((opt) => (
                            <button 
                                key={opt}
                                onClick={() => {
                                    onChange(valueMap ? valueMap[opt] : opt);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm font-medium transition-colors border-l-4 border-transparent hover:border-primary whitespace-nowrap flex items-center justify-between"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

const JobCardNew: React.FC<{ job: Job, onClick: () => void }> = ({ job, onClick }) => {
    const [shared, setShared] = useState(false);

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        
        const shareData = {
            title: job.title,
            text: `Check out this ${job.title} position at ${job.company}`,
            url: window.location.href,
        };

        const copyToClipboard = () => {
             navigator.clipboard.writeText(shareData.url).then(() => {
                setShared(true);
                setTimeout(() => setShared(false), 2000);
            }).catch(err => console.error("Clipboard failed", err));
        };

        if (typeof navigator.share === 'function') {
            try {
                if (navigator.canShare && !navigator.canShare(shareData)) {
                     copyToClipboard();
                     return;
                }
                await navigator.share(shareData);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    copyToClipboard();
                }
            }
        } else {
            copyToClipboard();
        }
    };

    return (
        <div 
            onClick={onClick}
            // @google/genai Coding Guidelines: DO add comment above each fix.
            // Adjusted padding inside the `JobCardNew` component to provide more pronounced spacing on the top, left, and right sides, with a slightly reduced padding on the bottom, for improved visual aesthetics.
            className="bg-white rounded-[2rem] pt-6 px-6 pb-4 sm:pt-8 sm:px-8 sm:pb-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer group relative hover:-translate-y-1"
        >
            <div className="flex flex-col h-full">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-1">{job.title}</h3>
                        <div className="text-base sm:text-lg text-gray-600 font-medium">{job.company}</div>
                     </div>
                     <div className="flex gap-2 shrink-0">
                        {job.isFeatured && (
                            <div className="bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border border-amber-100 flex items-center gap-1">
                                <Star size={10} fill="currentColor" /> Featured
                            </div>
                        )}
                     </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg">Expiring soon</span>
                    <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                         <MapPin size={16} /> {job.location}
                    </span>
                </div>

                {/* Description */}
                <div className="flex-grow">
                     <p className="text-sm sm:text-[15px] text-gray-600 line-clamp-6 mb-6 leading-relaxed whitespace-pre-wrap">
                        {job.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
                     <div className="text-sm font-bold text-gray-400">
                         {job.postedDate}
                     </div>
                     <button 
                        className={`p-2.5 transition-colors rounded-full active:scale-95 flex items-center gap-2 ${shared ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:text-primary hover:bg-primary/5'}`}
                        onClick={handleShare}
                        title={shared ? "Copied!" : "Share Job"}
                    >
                        {shared ? <Check size={18} /> : <Share2 size={20} />}
                        {shared && <span className="text-xs font-bold">Copied</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

const CountryCodeDropdown: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(() => 
    COUNTRY_CODES.find(c => c.dial_code === value) || COUNTRY_CODES.find(c => c.code === 'US'), 
    [value]
  );

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return COUNTRY_CODES;
    const lowerSearch = searchTerm.toLowerCase();
    return COUNTRY_CODES.filter(c => 
      c.name.toLowerCase().includes(lowerSearch) ||
      c.code.toLowerCase().includes(lowerSearch) ||
      c.dial_code.includes(searchTerm)
    );
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: typeof COUNTRY_CODES[0]) => {
    onChange(country.dial_code);
    setIsOpen(false);
    setSearchTerm('');
  };
  
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-2.5 px-3 sm:py-3 sm:px-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all h-[46px]"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <span className="text-lg">{selectedCountry?.flag}</span>
          <span>{selectedCountry?.dial_code}</span>
        </span>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-72 bg-white rounded-xl shadow-2xl border z-20 p-2 flex flex-col max-h-64 animate-[fadeIn_0.1s_ease-out]">
          <div className="relative p-2 shrink-0">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary outline-none text-sm text-gray-900"
              autoFocus
            />
          </div>
          <ul className="flex-1 overflow-y-auto custom-scroll p-1">
            {filteredCountries.length > 0 ? filteredCountries.map(country => (
              <li key={country.code}>
                <button 
                  type="button" 
                  onClick={() => handleSelect(country)}
                  className="w-full flex items-center gap-3 text-left p-2 sm:p-3 hover:bg-gray-50 rounded-lg text-sm"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1 font-medium text-gray-800 truncate">{country.name}</span>
                  <span className="text-gray-500">{country.dial_code}</span>
                </button>
              </li>
            )) : <li className="text-center text-xs text-gray-500 py-4">No countries found.</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

const CalendarPopup: React.FC<{
    onSelectDate: (date: string) => void;
    onClose: () => void;
    currentDate: string;
}> = ({ onSelectDate, onClose, currentDate }) => {
    const getInitialDate = () => {
        if (currentDate && /^\d{4}-\d{2}-\d{2}$/.test(currentDate)) {
            const [year, month, day] = currentDate.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            if (!isNaN(date.getTime())) return date;
        }
        return new Date();
    };
    
    const [date, setDate] = useState(getInitialDate());
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const changeDate = (unit: 'month' | 'year' | 'decade', delta: number) => {
        const newDate = new Date(date);
        if (unit === 'month') newDate.setMonth(month + delta);
        if (unit === 'year') newDate.setFullYear(year + delta);
        if (unit === 'decade') newDate.setFullYear(year + delta * 10);
        setDate(newDate);
    };

    const handleSelectDay = (day: number) => {
        const newDate = new Date(year, month, day);
        onSelectDate(newDate.toISOString().split('T')[0]);
        onClose();
    };

    const handleSelectMonth = (monthIndex: number) => {
        setDate(new Date(year, monthIndex, 1));
        setView('days');
    };

    const handleSelectYear = (selectedYear: number) => {
        setDate(new Date(selectedYear, month, 1));
        setView('months');
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthFullName = new Date(year, month).toLocaleString('default', { month: 'long' });

    const NavButton: React.FC<{ onClick: () => void, children: React.ReactNode, className?: string }> = ({ onClick, children, className = '' }) => (
        <button onClick={onClick} className={`w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors shadow-sm ${className}`}>
            {children}
        </button>
    );

    const renderHeader = (leftAction: () => void, middleContent: React.ReactNode, rightAction: () => void) => (
        <div className="flex justify-between items-center mb-4">
            <NavButton onClick={leftAction} className="bg-primary-light text-primary hover:bg-primary-lighter"><ChevronLeft size={20} /></NavButton>
            {middleContent}
            <div className="flex items-center gap-2"> 
                <NavButton onClick={rightAction} className="bg-primary-light text-primary hover:bg-primary-lighter"><ChevronRight size={20} /></NavButton>
                <NavButton onClick={onClose} className="bg-gray-100 text-gray-700 hover:bg-gray-200"><X size={20} /></NavButton>
            </div>
        </div>
    );

    const renderDaysView = () => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const emptyDays = Array.from({ length: firstDayOfMonth });
        
        return (
            <>
                {renderHeader(
                    () => changeDate('month', -1),
                    <div className="flex items-center gap-1">
                        <button onClick={() => setView('months')} className="font-bold text-gray-800 text-lg hover:bg-gray-100 px-3 py-1.5 rounded-lg">{monthFullName}</button>
                        <button onClick={() => setView('years')} className="font-bold text-gray-800 text-lg hover:bg-gray-100 px-3 py-1.5 rounded-lg">{year}</button>
                    </div>,
                    () => changeDate('month', 1)
                )}
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 text-xs py-1">{d}</div>)}
                    {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
                    {days.map(day => (
                        <button key={day} onClick={() => handleSelectDay(day)} className="w-10 h-10 mx-auto rounded-full hover:bg-primary-light hover:text-primary transition-colors text-gray-700 font-medium">{day}</button>
                    ))}
                </div>
            </>
        );
    };

    const renderMonthsView = () => (
        <>
            {renderHeader(
                () => changeDate('year', -1),
                <button onClick={() => setView('years')} className="font-bold text-gray-800 text-xl bg-gray-100 px-4 py-2 rounded-lg">{year}</button>,
                () => changeDate('year', 1)
            )}
            <div className="grid grid-cols-3 gap-2">
                {months.map((m, i) => (
                    <button key={m} onClick={() => handleSelectMonth(i)} className="p-4 text-base font-medium text-gray-700 rounded-lg hover:bg-primary-light hover:text-primary transition-colors">{m}</button>
                ))}
            </div>
        </>
    );

    const renderYearsView = () => {
        const startYear = Math.floor(year / 10) * 10;
        const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);
        return (
            <>
                {renderHeader(
                    () => changeDate('decade', -1),
                    <div className="font-bold text-gray-800 text-xl bg-gray-100 px-4 py-2 rounded-lg">{startYear} - {startYear + 9}</div>,
                    () => changeDate('decade', 1)
                )}
                <div className="grid grid-cols-4 gap-2">
                    {years.map(y => (
                        <button key={y} onClick={() => handleSelectYear(y)} className={`p-3 text-base rounded-lg hover:bg-primary-light hover:text-primary transition-colors ${(y < startYear || y > startYear+9) ? 'text-gray-400' : 'font-medium text-gray-700'}`}>{y}</button>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div
                ref={calendarRef}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 animate-[scaleIn_0.2s_ease-out] relative"
            >
                {view === 'days' && renderDaysView()}
                {view === 'months' && renderMonthsView()}
                {view === 'years' && renderYearsView()}
            </div>
        </div>
    );
};

const ReportIssueModal: React.FC<{ job: Job; onClose: () => void }> = ({ job, onClose }) => {
    const { submitIssueReport } = useApp();
    const [reportData, setReportData] = useState({ name: '', email: '', phone: '', description: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reportData.description) return;
        submitIssueReport({
            ...reportData,
            page: `Job Application: ${job.title}`
        });
        setIsSubmitted(true);
    };

    return (
        <div className="absolute inset-0 z-20 bg-white flex flex-col animate-[fadeIn_0.2s]">
             <div className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-gray-100 shrink-0 bg-white">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors text-gray-900"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                    <h3 className="font-bold text-gray-900 leading-none text-base flex items-center gap-2"><Flag size={16}/> Report an Issue</h3>
                </div>
            </div>
            {isSubmitted ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-6">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Report Sent</h3>
                    <p className="text-gray-500 max-w-sm">Thank you for your feedback. Our team will look into the issue shortly.</p>
                    <button onClick={onClose} className="mt-8 bg-primary text-white font-bold text-lg py-3 px-8 rounded-xl transition-all">Back to Application</button>
                </div>
            ) : (
                <>
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:px-8 custom-scroll pb-24">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <p className="text-sm text-gray-500">Describe the problem you're experiencing with the application for "{job.title}".</p>
                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Your Name (Optional)</label>
                            <input type="text" value={reportData.name} onChange={e => setReportData({...reportData, name: e.target.value})} className="w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all text-[15px]" placeholder="Rick Grimes" />
                        </div>
                         <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Your Email (Optional)</label>
                            <input type="email" value={reportData.email} onChange={e => setReportData({...reportData, email: e.target.value})} className="w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all text-[15px]" placeholder="hey@rickgrimes.com" />
                        </div>
                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Phone Number (Optional)</label>
                            <input type="tel" value={reportData.phone} onChange={e => setReportData({...reportData, phone: e.target.value})} className="w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all text-[15px]" placeholder="+1 (555) 123-4567" />
                        </div>
                        <div>
                            <label className="text-[13px] font-bold text-gray-800 mb-2 block">Issue Description<span className="text-primary ml-0.5">*</span></label>
                            <textarea rows={6} value={reportData.description} onChange={e => setReportData({...reportData, description: e.target.value})} required className="w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all text-[15px] resize-none" placeholder="E.g., The 'Continue' button is not working..."></textarea>
                        </div>
                    </form>
                </div>
                 <div className="absolute bottom-0 left-0 right-0 z-10 p-4 border-t border-gray-100 bg-white">
                    <button onClick={handleSubmit} type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/20 h-[56px] flex items-center justify-center gap-2">
                       <Send size={18}/> Submit Report
                    </button>
                </div>
                </>
            )}
        </div>
    );
};

const ApplicationModal: React.FC<{ job: Job, onClose: () => void, onSuccess: () => void }> = ({ job, onClose, onSuccess }) => {
    const [step, setStep] = useState(1);
    const initialFormData = {
        fullName: '', phone: '', email: '', portfolioLink: '', dateOfBirth: '',
        coverLetter: '', resume: null as { name: string; size: number } | null, countryCode: '+1'
    };
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReportingIssue, setIsReportingIssue] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const updateForm = useCallback((field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (prev[field]) {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        const savedDraft = localStorage.getItem(`draft_${job.id}`);
        if (savedDraft) {
            try {
                const parsedDraft = JSON.parse(savedDraft);
                // Ensure parsed data doesn't break the form state
                const mergedState = { ...initialFormData, ...parsedDraft };
                setFormData(mergedState);
            } catch (error) {
                console.error("Failed to parse saved application draft:", error);
                localStorage.removeItem(`draft_${job.id}`);
            }
        }
    }, [job.id]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCalendarClick = () => {
        setIsCalendarOpen(true);
    };

    useEffect(() => {
        const phone = formData.phone.trim();
        if (phone.startsWith('+')) {
            const sortedCodes = [...COUNTRY_CODES].sort((a, b) => (b.dial_code.split(',')[0].length - a.dial_code.split(',')[0].length));
            const found = sortedCodes.find(country => {
                const codes = country.dial_code.split(',').map(c => c.trim().replace(/-/g, ''));
                return codes.some(code => phone.startsWith(code));
            });

            if (found && found.dial_code !== formData.countryCode) {
                updateForm('countryCode', found.dial_code);
            }
        }
    }, [formData.phone, formData.countryCode, updateForm]);

    const validateStep = (currentStep: number) => {
        const newErrors: { [key: string]: string } = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.fullName.trim()) { newErrors.fullName = 'Full name is required'; isValid = false; }
            if (!formData.phone.trim()) { newErrors.phone = 'Phone number is required'; isValid = false; }
            if (!formData.email.trim()) {
                newErrors.email = 'Email address is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
                isValid = false;
            }
             if (formData.portfolioLink.trim() && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.portfolioLink)) {
                newErrors.portfolioLink = 'Please enter a valid URL';
                isValid = false;
            }
            if (formData.dateOfBirth.trim() && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(formData.dateOfBirth)) {
                newErrors.dateOfBirth = 'Please use YYYY-MM-DD format';
                isValid = false;
            }
        }

        if (currentStep === 2) {
            if (!formData.coverLetter.trim()) { newErrors.coverLetter = 'Cover letter is required'; isValid = false; }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (!validateStep(step)) return;
        if (step < 3) setStep(step + 1);
        else {
            localStorage.removeItem(`draft_${job.id}`);
            onSuccess();
        }
    };

    const steps = [{ id: 1, label: 'Personal' }, { id: 2, label: 'Additional' }, { id: 3, label: 'Review' }];
    
    const inputClass = "w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all placeholder:text-gray-400 text-[15px] h-[46px]";
    const errorInputClass = "border-red-500 focus:ring-red-500 focus:border-red-500";
    const labelClass = "text-[13px] font-bold text-gray-800 mb-2 block";
    const requiredClass = "text-primary ml-0.5";

    return (
        <div className="fixed inset-0 z-[70] flex flex-col bg-white md:bg-gray-900/60 md:backdrop-blur-sm md:items-center md:justify-center md:p-6 animate-[fadeIn_0.2s_ease-out]" onClick={onClose}>
            <div className="flex flex-col w-full h-full bg-white md:h-auto md:max-h-[85vh] md:max-w-lg md:rounded-[2rem] md:shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
                 <div className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between border-b border-gray-100 shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                        <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors text-gray-900"><ChevronLeft size={24} strokeWidth={2.5} /></button>
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full border border-gray-100 p-1 hidden xs:block"><img src={job.logoUrl} alt="" className="w-full h-full rounded-full object-cover"/></div>
                             <div><h3 className="font-bold text-gray-900 leading-none text-sm">{job.title}</h3><p className="text-xs text-gray-500 mt-1">{job.company}</p></div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 md:block hidden"><X size={24} /></button>
                        <div className="relative" ref={menuRef}>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-900 hover:bg-gray-100 rounded-full"><MoreVertical size={24} /></button>
                            {isMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-[fadeIn_0.1s_ease-out]">
                                    <button onClick={() => { localStorage.setItem(`draft_${job.id}`, JSON.stringify(formData)); alert('Draft saved!'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium">
                                        <Save size={18} /> Save Draft
                                    </button>
                                    <button onClick={() => { setIsReportingIssue(true); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium">
                                        <Flag size={18} /> Report an issue
                                    </button>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <Link to="/help-center" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium">
                                        <HelpCircle size={18} /> Help Center
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                 </div>
                 
                 <div className="px-4 py-3 sm:px-6 sm:py-5 bg-gray-50/50 border-b border-gray-100 shrink-0">
                     <div className="flex items-center justify-between relative">
                         {steps.map((s, i) => {
                            const isCompleted = s.id < step, isActive = s.id === step;
                            let circleClass = "", textClass = "", icon = null;
                            if (isActive) { circleClass = "bg-primary text-white"; textClass = "text-primary"; icon = s.id; }
                            else if (isCompleted) { circleClass = "bg-green-500 text-white"; textClass = "text-green-600"; icon = <Check size={12} strokeWidth={4} />; }
                            else { circleClass = "bg-gray-200 text-gray-500"; textClass = "text-gray-400"; icon = s.id; }
                            return (
                                <React.Fragment key={s.id}>
                                    <div className="flex items-center gap-2 relative z-10">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${circleClass}`}>{icon}</div>
                                        <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${textClass}`}>{s.label}</span>
                                    </div>
                                    {i < steps.length - 1 && (<div className="flex-1 h-[2px] mx-2 relative"><div className="absolute inset-0 bg-gray-200"></div><div className={`absolute inset-0 transition-all duration-500 ${s.id < step ? 'bg-green-500 w-full' : 'w-0'}`}></div></div>)}
                                </React.Fragment>
                            )
                         })}
                     </div>
                 </div>

                 <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:px-8 bg-white custom-scroll pb-24">
                     {step === 1 && (
                         <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                             <div>
                                 <h2 className="text-xl font-bold text-gray-900">Personal information</h2>
                                 <p className="text-sm text-gray-500 mt-1">Let us get to know you a bit better by sharing your basic info.</p>
                                 <div className="text-xs text-primary mt-2 font-bold">*Required fields</div>
                             </div>
                             <div className="space-y-5">
                                 <div>
                                     <label className={labelClass}>Full name<span className={requiredClass}>*</span></label>
                                     <div className="relative"><input type="text" value={formData.fullName} onChange={e => updateForm('fullName', e.target.value)} className={`${inputClass} ${errors.fullName ? errorInputClass : ''}`} placeholder="Rick Grimes" />{formData.fullName && !errors.fullName && <Check size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}</div>
                                     {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                 </div>
                                 <div>
                                     <label className={labelClass}>Phone number<span className={requiredClass}>*</span></label>
                                     <div className="flex gap-2">
                                         <div className="relative w-32 shrink-0"><CountryCodeDropdown value={formData.countryCode} onChange={code => updateForm('countryCode', code)} /></div>
                                         <div className="relative flex-1"><input type="tel" value={formData.phone} onChange={e => updateForm('phone', e.target.value)} className={`${inputClass} ${errors.phone ? errorInputClass : ''}`} placeholder="89 580 618 422 2" /></div>
                                     </div>
                                     {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                 </div>
                                 <div>
                                     <label className={labelClass}>Email address<span className={requiredClass}>*</span></label>
                                     <div className="relative"><input type="email" value={formData.email} onChange={e => updateForm('email', e.target.value)} className={`${inputClass} ${errors.email ? errorInputClass : ''}`} placeholder="hey@rickgrimes.com" />{formData.email && !errors.email && formData.email.includes('@') && <Check size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}</div>
                                     {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                 </div>
                                  <div>
                                     <label className={labelClass}>Date of Birth</label>
                                      <div className="relative">
                                          <input 
                                              type="text" 
                                              value={formData.dateOfBirth}
                                              onChange={e => updateForm('dateOfBirth', e.target.value)}
                                              className={`${inputClass} ${errors.dateOfBirth ? errorInputClass : ''}`}
                                              placeholder="YYYY-MM-DD"
                                          />
                                          <button type="button" onClick={handleCalendarClick} className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100">
                                              <Calendar size={18} />
                                          </button>
                                          {isCalendarOpen && (
                                              <CalendarPopup 
                                                  currentDate={formData.dateOfBirth}
                                                  onSelectDate={(date) => {
                                                      updateForm('dateOfBirth', date);
                                                      setIsCalendarOpen(false);
                                                  }}
                                                  onClose={() => setIsCalendarOpen(false)}
                                              />
                                          )}
                                      </div>
                                      {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                                  </div>
                                 <div>
                                     <label className={labelClass}>Portfolio link</label>
                                     <div className="relative"><input type="url" value={formData.portfolioLink} onChange={e => updateForm('portfolioLink', e.target.value)} className={`${inputClass} ${errors.portfolioLink ? errorInputClass : ''} pl-11`} placeholder="example.com/rickrames" /><LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />{formData.portfolioLink && !errors.portfolioLink && <Check size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />}</div>
                                     {errors.portfolioLink && <p className="text-red-500 text-xs mt-1">{errors.portfolioLink}</p>}
                                 </div>
                             </div>
                         </div>
                     )}
                     {step === 2 && (
                          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                             <div>
                                 <h2 className="text-xl font-bold text-gray-900">Additional information</h2>
                                 <p className="text-sm text-gray-500 mt-1">In order to match you with the right opportunities we need some additional information first.</p>
                                 <div className="text-xs text-primary mt-2 font-bold">*Required fields</div>
                             </div>
                             <div className="space-y-5">
                                 <div>
                                     <label className={labelClass}>Cover letter<span className={requiredClass}>*</span></label>
                                     <textarea rows={7} value={formData.coverLetter} onChange={e => updateForm('coverLetter', e.target.value)} className={`w-full py-2.5 px-3 sm:py-3 sm:px-4 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none font-medium text-gray-900 transition-all placeholder:text-gray-400 text-[15px] resize-none leading-relaxed ${errors.coverLetter ? errorInputClass : ''}`} placeholder="Dear Hiring Manager..." />
                                     {errors.coverLetter && <p className="text-red-500 text-xs mt-1">{errors.coverLetter}</p>}
                                 </div>
                                 <div>
                                     <label className={labelClass}>Resume</label>
                                     {formData.resume ? (
                                         <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                             <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><FileText size={24} /></div>
                                             <div className="min-w-0 flex-1"><div className="text-sm font-bold text-gray-900 truncate">{formData.resume.name}</div><div className="text-xs text-gray-500">{(formData.resume.size / 1024 / 1024).toFixed(2)} MB</div></div>
                                             <button onClick={() => updateForm('resume', null)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                         </div>
                                     ) : (
                                        <div className="border border-gray-200 rounded-xl p-6 flex items-center gap-4 cursor-pointer hover:border-primary transition-colors bg-white group shadow-sm" onClick={() => updateForm('resume', { name: 'Sr. Web Designer Role - Rick.pdf', size: 2 * 1024 * 1024 })}>
                                            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 text-gray-400 group-hover:text-primary group-hover:bg-primary-light/10 transition-colors"><UploadCloud size={24} /></div>
                                            <div><div className="text-sm font-bold text-gray-900">Upload Resume</div><div className="text-xs text-gray-500 mt-0.5">PDF or DOCX up to 5MB</div></div>
                                        </div>
                                     )}
                                 </div>
                             </div>
                          </div>
                     )}
                     {step === 3 && (
                          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
                             <div><h2 className="text-xl font-bold text-gray-900">Review your application</h2><p className="text-sm text-gray-500 mt-1">Is the information you have submitted correct?</p></div>
                             <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                 <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-gray-900 text-base">Personal information</h3><button onClick={() => setStep(1)} className="text-xs font-bold text-white bg-gray-900 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-800 transition-colors"><Edit2 size={12} /> Edit</button></div>
                                 <div className="space-y-4">
                                     <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Full name</div><div className="font-medium text-gray-900">{formData.fullName}</div></div>
                                     <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Phone number</div><div className="font-medium text-gray-900">{formData.countryCode} {formData.phone}</div></div>
                                     <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Email address</div><div className="font-medium text-gray-900 break-all">{formData.email}</div></div>
                                     <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Date of Birth</div><div className="font-medium text-gray-900">{formData.dateOfBirth || 'No answer'}</div></div>
                                     <div><div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Portfolio Link</div><div className="font-medium text-gray-900 break-all">{formData.portfolioLink || 'No answer'}</div></div>
                                 </div>
                             </div>
                             <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                                 <div className="flex justify-between items-center mb-5"><h3 className="font-bold text-gray-900 text-base">Additional information</h3><button onClick={() => setStep(2)} className="text-xs font-bold text-white bg-gray-900 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-800 transition-colors"><Edit2 size={12} /> Edit</button></div>
                                 <div className="space-y-4">
                                      <div>
                                         <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Resume</div>
                                         {formData.resume ? (<div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 w-full overflow-hidden"><div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center shrink-0"><FileText size={20} /></div><div className="truncate font-medium text-sm text-gray-900">{formData.resume.name}</div></div>) : (<div className="text-gray-500 italic">No resume attached</div>)}
                                     </div>
                                 </div>
                             </div>
                          </div>
                     )}
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 z-10 p-4 border-t border-gray-100 bg-white">
                    <button onClick={handleNext} className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/20 h-[56px] flex items-center justify-center">
                        {step === 3 ? 'Submit' : 'Continue'}
                    </button>
                </div>
                 {isReportingIssue && <ReportIssueModal job={job} onClose={() => setIsReportingIssue(false)} />}
            </div>
        </div>
    )
}

const JobDetailView: React.FC<{ job: Job; onClose: () => void; onApply: () => void; onViewCompanyJobs: () => void }> = ({ job, onClose, onApply, onViewCompanyJobs }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    // @google/genai Coding Guidelines: DO add comment above each fix.
    // Added state to control the visibility of the ReportIssueModal in JobDetailView.
    const [isReportingIssue, setIsReportingIssue] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const shareUrl = window.location.href; 
    const shareText = `Check out this ${job.title} position at ${job.company}`;

    return (
        <div className="fixed inset-0 z-[60] bg-white overflow-hidden flex flex-col animate-[slideUp_0.3s_ease-out]">
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 shrink-0 bg-white">
                <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"><ArrowLeft size={24} /></button>
                <div className="font-bold text-lg">{job.company}</div>
                <div className="relative" ref={menuRef}>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-full"><MoreVertical size={24} /></button>
                    {menuOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                            <a href={`mailto:?subject=${encodeURIComponent(job.title)}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium"><Mail size={18} /> Email</a>
                            <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium"><Facebook size={18} /> Facebook</button>
                            <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`, '_blank')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium"><Twitter size={18} /> Twitter</button>
                            <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${encodeURIComponent(job.title)}`, '_blank')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium"><Linkedin size={18} /> LinkedIn</button>
                            {job.customLinks?.map((link, i) => (<a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium"><LinkIcon size={18} /> {link.label}</a>))}
                            <div className="h-px bg-gray-100 my-1"></div>
                            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                            {/* Modified the "Report job ad" button to set `isReportingIssue` to true, opening the ReportIssueModal. */}
                            <button onClick={() => { setIsReportingIssue(true); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-gray-700 font-medium"><Flag size={18} /> Report job ad</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 pb-20 sm:p-6 sm:pb-24 custom-scroll">
                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Implemented conditional rendering for the job banner image. */}
                {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Removed the gradient overlay from the job banner image. */}
                {job.headerImage && (
                    <div className="relative h-40 md:h-64 rounded-2xl overflow-hidden bg-gray-100 mb-6">
                        <img src={job.headerImage} alt={`${job.title} banner`} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                    {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                    {/* Implemented conditional rendering for the company logo. */}
                    {job.logoUrl && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-white p-1 flex items-center justify-center">
                            <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-contain" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-1">{job.title}</h1>
                        <div className="flex items-center gap-2 text-primary font-bold text-base">
                            {job.company}
                            <CheckCircle2 size={16} fill="currentColor" className="text-blue-500" />
                        </div>
                    </div>
                </div>
                <button onClick={onViewCompanyJobs} className="text-gray-400 text-sm font-normal underline ml-2 hover:text-primary transition-colors block w-fit">View all jobs from {job.company}</button>
                
                 {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
                {/* Changed to a two-column grid layout for job metadata details. */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8 mt-6">
                    <div className="flex items-start gap-3 text-gray-600"><MapPin size={20} className="shrink-0 mt-0.5" /><span>{job.location}</span></div>
                    <div className="flex items-start gap-3 text-gray-600"><Briefcase size={20} className="shrink-0 mt-0.5" /><span>{job.category} & {job.type}</span></div>
                    <div className="flex items-start gap-3 text-gray-600"><Clock size={20} className="shrink-0 mt-0.5" /><span>{job.type}</span></div>
                     <div className="flex items-start gap-3 text-gray-600"><DollarSign size={20} className="shrink-0 mt-0.5" /><span>{job.salary || "Add expected salary to your profile for insights"}</span></div>
                 </div>
                 <div className="text-gray-500 text-sm mb-6">Posted {job.postedDate}</div>
                 <div className="prose prose-gray max-w-none">
                     <h3 className="font-bold text-lg text-gray-900 mb-3">Job Description</h3>
                     <p className="whitespace-pre-wrap text-gray-600 leading-relaxed">{job.description}</p>
                     {job.highlights && job.highlights.length > 0 && (<div className="mt-6"><h3 className="font-bold text-lg text-gray-900 mb-3">Highlights</h3><ul className="space-y-2">{job.highlights.map((h, i) => (<li key={i} className="flex items-start gap-2 text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>{h}</li>))}</ul></div>)}
                 </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-white absolute bottom-0 left-0 right-0 z-10"><button onClick={onApply} className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-primary/20 h-[56px] flex items-center justify-center">Quick apply</button></div>
            {/* @google/genai Coding Guidelines: DO add comment above each fix. */}
            {/* Conditionally rendered ReportIssueModal when `isReportingIssue` is true. */}
            {isReportingIssue && <ReportIssueModal job={job} onClose={() => setIsReportingIssue(false)} />}
        </div>
    );
}

export const Careers = () => {
  const { jobs } = useApp();
  const activeJobs = useMemo(() => jobs.filter(j => j.archiveStatus === 'active'), [jobs]);
  const [keyword, setKeyword] = useState('');
  const [workType, setWorkType] = useState('All types');
  const [remoteOption, setRemoteOption] = useState('Any location');
  const [minSalary, setMinSalary] = useState(0);
  const [listedTime, setListedTime] = useState('listed any time');
  const [maxSalaryFilter, setMaxSalaryFilter] = useState('Any');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredJobs = useMemo(() => {
    return activeJobs.filter(job => {
      const keywordMatch = keyword ? job.title.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase()) || job.company.toLowerCase().includes(keyword.toLowerCase()) : true;
      const workTypeMatch = workType !== 'All types' ? job.type.toLowerCase() === workType.toLowerCase() : true;
      let remoteMatch = true;
      if (remoteOption === 'Remote') { remoteMatch = !!job.isRemote || job.location.toLowerCase().includes('remote'); } 
      else if (remoteOption === 'On-site') { remoteMatch = !job.isRemote && !job.location.toLowerCase().includes('remote'); }
      const salaryMatch = minSalary === 0 || (job.salaryMax ? job.salaryMax >= minSalary : true);
      let maxSalaryMatch = true;
      if (maxSalaryFilter !== 'Any') {
          const maxLimit = parseInt(maxSalaryFilter.replace(/[^0-9]/g, '')) * 1000;
          if (maxLimit && job.salaryMax) { maxSalaryMatch = job.salaryMax <= maxLimit; }
      }
      return keywordMatch && workTypeMatch && remoteMatch && salaryMatch && maxSalaryMatch;
    });
  }, [activeJobs, keyword, workType, remoteOption, minSalary, maxSalaryFilter]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => { setCurrentPage(1); }, [keyword, workType, remoteOption, minSalary, listedTime, maxSalaryFilter]);

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [viewJob, setViewJob] = useState<Job | null>(null);
  const [applyingJob, setApplyingJob] = useState<Job | null>(null);

  const handleCardClick = (job: Job) => setViewJob(job);

  const handleApply = () => {
      if (viewJob) { setApplyingJob(viewJob); setIsApplicationModalOpen(true); }
  };

  const clearFilters = () => {
      setKeyword(''); setWorkType('All types'); setRemoteOption('Any location'); setMinSalary(0); setListedTime('listed any time'); setMaxSalaryFilter('Any');
  };

  const handleViewCompanyJobs = (companyName: string) => {
      setKeyword(companyName); setWorkType('All types'); setRemoteOption('Any location'); setMinSalary(0); setListedTime('listed any time'); setMaxSalaryFilter('Any'); setViewJob(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const jobTypes = useMemo(() => ['All types', ...Array.from(new Set(activeJobs.map(j => j.type)))], [activeJobs]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16 sm:pt-[112px]">
      <div className="bg-primary text-white">
          <div className="max-w-2xl mx-auto px-4 py-8">
               <div className="bg-white rounded-xl flex items-center p-1 shadow-xl mb-6 border border-gray-200/20 h-14">
                  <Search className="text-gray-400 ml-3" size={20} />
                  <input type="text" placeholder="Search jobs..." className="flex-1 px-3 py-1.5 outline-none text-gray-900 placeholder:text-gray-400 font-medium bg-transparent text-lg" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
               </div>
               <div className="flex flex-col gap-3">
                   <div className="flex flex-nowrap overflow-x-auto gap-3 pb-1 no-scrollbar items-center mask-linear-fade">
                       <FilterPill label={workType} options={jobTypes} onChange={setWorkType} />
                       <FilterPill label={remoteOption} options={['Any location', 'Remote', 'On-site']} onChange={setRemoteOption} />
                       <FilterPill label={`paying $${minSalary/1000}k+`} options={['paying $0+', 'paying $80k+', 'paying $120k+', 'paying $150k+', 'paying $200k+']} valueMap={{'paying $0+': 0, 'paying $80k+': 80000, 'paying $120k+': 120000, 'paying $150k+': 120000, 'paying $200k+': 200000}} onChange={setMinSalary} />
                       <FilterPill label={maxSalaryFilter === 'Any' ? 'to $350K+' : maxSalaryFilter} options={['Any', 'to $350K+', 'to $200K', 'to $150K']} onChange={setMaxSalaryFilter} />
                       <FilterPill label={listedTime} options={['listed any time', 'Past 24 hours', 'Past week', 'Past month']} onChange={setListedTime} />
                   </div>
                   <div className="flex justify-end"><button onClick={clearFilters} className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-bold transition-colors group px-2 py-1 rounded hover:bg-white/10" title="Reset all filters"><RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" /><span>Reset</span></button></div>
               </div>
          </div>
      </div>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
         <div className="space-y-4">
            {paginatedJobs.map(job => (<JobCardNew key={job.id} job={job} onClick={() => handleCardClick(job)} />))}
            {paginatedJobs.length === 0 && (<div className="text-center py-20 text-gray-500"><p className="text-xl font-bold">No jobs found</p><p>Try adjusting your search criteria</p><button onClick={clearFilters} className="mt-4 text-primary font-bold hover:underline">Clear all filters</button></div>)}
         </div>

         {totalPages > 0 && (
             <div className="mt-12 flex justify-center items-center gap-2">
                 <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent"><ArrowLeft size={20} className="text-gray-600" /></button>
                 {[...Array(totalPages)].map((_, i) => (<button key={i} onClick={() => handlePageChange(i + 1)} className={`w-10 h-10 rounded-lg font-bold text-sm transition-colors ${currentPage === i + 1 ? 'bg-primary-light text-primary' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{i + 1}</button>))}
                 <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent">Next <ArrowRight size={16} /></button>
             </div>
         )}
         
         <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center md:text-left">
             <h3 className="text-2xl font-bold text-secondary mb-2">Want to receive jobs by email?</h3>
             <p className="text-gray-500 mb-6">Create a job alert and never miss an opportunity.</p>
             <div className="flex flex-col md:flex-row gap-4"><input type="email" placeholder="Enter your email" className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white text-gray-900" /><button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg shadow-primary/20">Create alert</button></div>
         </div>
      </main>
      
      {viewJob && (<JobDetailView job={viewJob} onClose={() => setViewJob(null)} onApply={handleApply} onViewCompanyJobs={() => handleViewCompanyJobs(viewJob.company)} />)}
      {isApplicationModalOpen && applyingJob && (<ApplicationModal job={applyingJob} onClose={() => setIsApplicationModalOpen(false)} onSuccess={() => { setIsApplicationModalOpen(false); setViewJob(null); }} />)}
    </div>
  );
};