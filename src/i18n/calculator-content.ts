
export const calculatorContent = {
    en: {
        steps: {
            experience: "Experience",
            education: "Education",
            profession: "Profession",
            language: "Language",
            wage: "Wage",
            location: "Location",
            result: "Summary"
        },
        experience: {
            title: "Work Experience",
            subtitle: "Directly related to BC job offer occupation.",
            options: {
                none: "No experience",
                less_than_1: "Less than 1 year",
                one_to_two: "1 to <2 years",
                two_to_three: "2 to <3 years",
                three_to_four: "3 to <4 years",
                four_to_five: "4 to <5 years",
                five_plus: "5+ years"
            },
            canadian_exp: {
                title: "1+ Year Canadian Work Experience",
                subtitle: "+10 Points"
            },
            current_job: {
                title: "Currently Working Full-Time in BC",
                subtitle: "+10 Points (For this employer/occupation)"
            }
        },
        education: {
            title: "Education",
            subtitle: "Highest completed credential.",
            options: {
                secondary: "High school or less",
                trades_cert: "Post-secondary Diploma/Certificate",
                trades_cert_sub: "Trades or Non-trades",
                associate: "Associate Degree",
                bachelor: "Bachelor's Degree",
                post_grad_cert: "Post-Graduate Certificate/Diploma",
                master: "Master's Degree",
                doctorate: "Doctorate (PhD)"
            },
            canadian_education: {
                title: "Completed post-secondary education in Canada",
                subtitle: "Unlocks bonus points"
            },
            location: {
                none_label: "Select where you completed your education to get bonus points",
                bc: "Completed in BC",
                canada: "Completed in Canada (outside BC)"
            }
        },
        profession: {
            title: "Professional Designation",
            subtitle: "Job offer in an eligible regulated profession?",
            toggle: {
                title: "Eligible Professional Designation",
                subtitle: "+5 Points (Healthcare/Regulated)"
            },
            select_label: "Select Occupation",
            default_option: "Choose an occupation...",
            applied: "+5 points applied",
            instruction: "Please select an occupation to get +5 points"
        },
        language: {
            title: "Language Proficiency",
            subtitle: "CLB level (lowest of 4 skills). Tests must be within last 2 years.",
            english: {
                title: "English Test Completed",
                subtitle: "IELTS, CELPIP, etc.",
                label: "English CLB Level",
                instruction: "Select your CLB level (CLB 4+ earns points)"
            },
            french: {
                title: "French Test Completed",
                subtitle: "TEF, TCF, etc.",
                label: "French CLB Level",
                instruction: "Select your CLB level (CLB 4+ earns points)"
            }
        },
        wage: {
            title: "Hourly Wage",
            subtitle: "Base hourly wage of your BC job offer.",
            annual: "Annual:",
            points_badge: "Wage Points",
            min_label: "Min ($16/hr)",
            max_label: "Max ($70+/hr)",
            min_points: "0 points",
            one_point: "1 point",
            max_points: "55 points"
        },
        location_step: {
            title: "Job Location",
            subtitle: "Where is your BC job offer located?",
            options: {
                area1: "Area 1: Metro Vancouver",
                area1_sub: "Vancouver, Burnaby, Richmond, Surrey, etc.",
                area2: "Area 2: Near-Metro",
                area2_sub: "Squamish, Abbotsford, Agassiz, Mission, Chilliwack",
                area3: "Area 3: Rest of BC",
                area3_sub: "All other BC regions"
            },
            bonuses: {
                title: "Regional Bonuses",
                worked_outside: {
                    title: "1+ Year Employment Outside Area 1",
                    subtitle: "+10 Points (Within last 5 years)"
                },
                graduated_outside: {
                    title: "Graduated from BC Institution Outside Area 1",
                    subtitle: "+10 Points (Public institution, within 3 years)"
                }
            }
        },
        result: {
            total_score: "Total BC PNP Score",
            max_possible: "Max Possible: 200",
            human_capital: "Human Capital Factors",
            economic_factors: "Economic Factors",
            categories: {
                experience: "Work Experience Category (Max 40)",
                direct: "Direct Experience",
                canadian: "Canadian Exp",
                current_job: "Current BC Job",
                education: "Education Category (Max 40)",
                edu_level: "Education Level",
                location_bonus: "BC/Canada Bonus",
                prof_desig: "Professional Desig.",
                language: "Language Category (Max 40)",
                english: "English CLB",
                french: "French CLB",
                wage: "Hourly Wage",
                area: "Area of Employment",
                regional: "Regional Bonuses"
            },
            restart: "Restart Calculator"
        },
        nav: {
            next: "Next Step",
            back: "Back"
        }
    },
    zh: {
        steps: {
            experience: "工作經驗",
            education: "教育背景",
            profession: "專業資格",
            language: "語言能力",
            wage: "薪資水平",
            location: "工作地點",
            result: "評分匯總"
        },
        experience: {
            title: "工作經驗",
            subtitle: "與 BC 省工作錄取信職位直接相關的經驗。",
            options: {
                none: "無經驗",
                less_than_1: "少於 1 年",
                one_to_two: "1 至 2 年",
                two_to_three: "2 至 3 年",
                three_to_four: "3 至 4 年",
                four_to_five: "4 至 5 年",
                five_plus: "5 年以上"
            },
            canadian_exp: {
                title: "1 年以上加拿大工作經驗",
                subtitle: "+10 分"
            },
            current_job: {
                title: "目前在 BC 省全職工作",
                subtitle: "+10 分 (針對該雇主/職位)"
            }
        },
        education: {
            title: "教育背景",
            subtitle: "最高獲得的學歷。",
            options: {
                secondary: "高中或以下",
                trades_cert: "大專文憑/證書",
                trades_cert_sub: "技工或非技工類",
                associate: "副學士學位",
                bachelor: "學士學位",
                post_grad_cert: "研究生證書/文憑",
                master: "碩士學位",
                doctorate: "博士學位 (PhD)"
            },
            canadian_education: {
                title: "在加拿大完成高等教育",
                subtitle: "解鎖額外加分"
            },
            location: {
                none_label: "選擇您的學歷獲得地點以獲得加分",
                bc: "在 BC 省完成",
                canada: "在加拿大其他省份完成"
            }
        },
        profession: {
            title: "專業資格",
            subtitle: "是否有符合資格的受監管職業工作錄取信？",
            toggle: {
                title: "符合資格的專業資格",
                subtitle: "+5 分 (醫療/受監管職業)"
            },
            select_label: "選擇職業",
            default_option: "請選擇職業...",
            applied: "已加 +5 分",
            instruction: "請選擇職業以獲得 +5 分"
        },
        language: {
            title: "語言能力",
            subtitle: "CLB 等級 (四項技能中最低項)。成績兩年內有效。",
            english: {
                title: "已完成英語考試",
                subtitle: "IELTS, CELPIP 等",
                label: "英語 CLB 等級",
                instruction: "選擇您的 CLB 等級 (CLB 4+ 有分)"
            },
            french: {
                title: "已完成法語考試",
                subtitle: "TEF, TCF 等",
                label: "法語 CLB 等級",
                instruction: "選擇您的 CLB 等級 (CLB 4+ 有分)"
            }
        },
        wage: {
            title: "時薪",
            subtitle: "BC 省工作錄取信的基本時薪。",
            annual: "年薪:",
            points_badge: "薪資得分",
            min_label: "最低 ($16/時)",
            max_label: "最高 ($70+/時)",
            min_points: "0 分",
            one_point: "1 分",
            max_points: "55 分"
        },
        location_step: {
            title: "工作地點",
            subtitle: "您的 BC 省職位位於哪裡？",
            options: {
                area1: "區域 1: 大溫哥華地區",
                area1_sub: "溫哥華, 本拿比, 列治文, 素里等",
                area2: "區域 2: 鄰近地區",
                area2_sub: "斯闊米什, 阿伯茨福德, 奇利瓦克等",
                area3: "區域 3: BC 省其他地區",
                area3_sub: "所有其他地區"
            },
            bonuses: {
                title: "區域加分",
                worked_outside: {
                    title: "1 年以上區域 1 以外的工作經驗",
                    subtitle: "+10 分 (過去 5 年內)"
                },
                graduated_outside: {
                    title: "畢業於區域 1 以外的 BC 院校",
                    subtitle: "+10 分 (公立院校, 3 年內)"
                }
            }
        },
        result: {
            total_score: "BC PNP 總分",
            max_possible: "最高可能分數: 200",
            human_capital: "人力資本因素",
            economic_factors: "經濟因素",
            categories: {
                experience: "工作經驗類別 (最高 40)",
                direct: "直接經驗",
                canadian: "加拿大經驗",
                current_job: "目前 BC 工作",
                education: "教育背景類別 (最高 40)",
                edu_level: "學歷等級",
                location_bonus: "BC/加拿大加分",
                prof_desig: "專業資格",
                language: "語言能力類別 (最高 40)",
                english: "英語 CLB",
                french: "法語 CLB",
                wage: "時薪",
                area: "工作區域",
                regional: "區域加分"
            },
            restart: "重新計算"
        },
        nav: {
            next: "下一步",
            back: "返回"
        }
    },
    hi: {
        steps: {
            experience: "अनुभव",
            education: "शिक्षा",
            profession: "पेशा",
            language: "भाषा",
            wage: "वेतन",
            location: "स्थान",
            result: "सारांश"
        },
        experience: {
            title: "कार्य अनुभव",
            subtitle: "BC जॉब ऑफर occupation से सीधे संबंधित।",
            options: {
                none: "कोई अनुभव नहीं",
                less_than_1: "1 वर्ष से कम",
                one_to_two: "1 से 2 वर्ष",
                two_to_three: "2 से 3 वर्ष",
                three_to_four: "3 से 4 वर्ष",
                four_to_five: "4 से 5 वर्ष",
                five_plus: "5+ वर्ष"
            },
            canadian_exp: {
                title: "1+ वर्ष का कनाडाई कार्य अनुभव",
                subtitle: "+10 अंक"
            },
            current_job: {
                title: "वर्तमान में BC में पूर्णकालिक कार्यरत",
                subtitle: "+10 अंक (इस नियोक्ता/पेंशे के लिए)"
            }
        },
        education: {
            title: "शिक्षा",
            subtitle: "उच्चतम पूर्ण क्रेडेंशियल।",
            options: {
                secondary: "हाई स्कूल या उससे कम",
                trades_cert: "पोस्ट-सेकेंडरी डिप्लोमा/सर्टिफिकेट",
                trades_cert_sub: "ट्रेड्स या नॉन-ट्रेड्स",
                associate: "एसोसिएट डिग्री",
                bachelor: "बैचलर डिग्री",
                post_grad_cert: "पोस्ट-ग्रेजुएट सर्टिफिकेट/डिप्लोमा",
                master: "मास्टर डिग्री",
                doctorate: "डॉक्टरेट (PhD)"
            },
            canadian_education: {
                title: "कनाडा में पोस्ट-सेकेंडरी शिक्षा पूरी की",
                subtitle: "बोनस अंक अनलॉक करें"
            },
            location: {
                none_label: "बोनस प्राप्त करने के लिए चुनें कि आपने शिक्षा कहाँ पूरी की",
                bc: "BC में पूरी की",
                canada: "कनाडा में पूरी की (BC के बाहर)"
            }
        },
        profession: {
            title: "पेंशेवर पदनाम",
            subtitle: "क्या योग्य विनियमित पेशे में जॉब ऑफर है?",
            toggle: {
                title: "योग्य पेशेवर पदनाम",
                subtitle: "+5 अंक (हेल्थकेयर/विनियमित)"
            },
            select_label: "व्यवसाय चुनें",
            default_option: "व्यवसाय चुनें...",
            applied: "+5 अंक लागू",
            instruction: "+5 अंक प्राप्त करने के लिए कृपया एक व्यवसाय चुनें"
        },
        language: {
            title: "भाषा प्रवीणता",
            subtitle: "CLB स्तर (4 कौशल में सबसे कम)। टेस्ट पिछले 2 वर्षों के भीतर होने चाहिए।",
            english: {
                title: "अंग्रेजी टेस्ट पूरा किया",
                subtitle: "IELTS, CELPIP, आदि",
                label: "अंग्रेजी CLB स्तर",
                instruction: "अपना CLB स्तर चुनें (CLB 4+ पर अंक मिलते हैं)"
            },
            french: {
                title: "फ्रेंच टेस्ट पूरा किया",
                subtitle: "TEF, TCF, आदि",
                label: "फ्रेंच CLB स्तर",
                instruction: "अपना CLB स्तर चुनें (CLB 4+ पर अंक मिलते हैं)"
            }
        },
        wage: {
            title: "प्रति घंटा वेतन",
            subtitle: "आपके BC जॉब ऑफर का मूल प्रति घंटा वेतन।",
            annual: "वार्षिक:",
            points_badge: "वेतन अंक",
            min_label: "न्यूनतम ($16/घंटा)",
            max_label: "अधिकतम ($70+/घंटा)",
            min_points: "0 अंक",
            one_point: "1 अंक",
            max_points: "55 अंक"
        },
        location_step: {
            title: "नौकरी का स्थान",
            subtitle: "आपका BC जॉब ऑफर कहाँ स्थित है?",
            options: {
                area1: "क्षेत्र 1: मेट्रो वैंकूवर",
                area1_sub: "वैंकूवर, बर्नाबी, रिचमंड, सरे, आदि",
                area2: "क्षेत्र 2: नियर-मेट्रो",
                area2_sub: "स्क्वाamish, एबॉट्सफ़ोर्ड, चिलिवाक, आदि",
                area3: "क्षेत्र 3: शेष BC",
                area3_sub: "अन्य सभी BC क्षेत्र"
            },
            bonuses: {
                title: "क्षेत्रीय बोनस",
                worked_outside: {
                    title: "क्षेत्र 1 के बाहर 1+ वर्ष का रोजगार",
                    subtitle: "+10 अंक (पिछले 5 वर्षों में)"
                },
                graduated_outside: {
                    title: "क्षेत्र 1 के बाहर BC संस्थान से स्नातक",
                    subtitle: "+10 अंक (सार्वजनिक संस्थान, 3 वर्षों में)"
                }
            }
        },
        result: {
            total_score: "कुल BC PNP स्कोर",
            max_possible: "अधिकतम संभव: 200",
            human_capital: "मानव पूंजी कारक",
            economic_factors: "आर्थिक कारक",
            categories: {
                experience: "कार्य अनुभव श्रेणी (अधिकतम 40)",
                direct: "सीधा अनुभव",
                canadian: "कनाडाई अनुभव",
                current_job: "वर्तमान BC जॉब",
                education: "शिक्षा श्रेणी (अधिकतम 40)",
                edu_level: "शिक्षा स्तर",
                location_bonus: "BC/कनाडा बोनस",
                prof_desig: "पेशेवर पदनाम",
                language: "भाषा श्रेणी (अधिकतम 40)",
                english: "अंग्रेजी CLB",
                french: "फ्रेंच CLB",
                wage: "प्रति घंटा वेतन",
                area: "रोजगार का क्षेत्र",
                regional: "क्षेत्रीय बोनस"
            },
            restart: "कैलकुलेटर रिस्टार्ट करें"
        },
        nav: {
            next: "अगला चरण",
            back: "वापस"
        }
    }
};
