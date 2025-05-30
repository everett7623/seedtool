document.addEventListener('DOMContentLoaded', () => {
    // Tab 切换逻辑
    const tabLinks = document.querySelectorAll('.tab-link');
    const toolContainers = document.querySelectorAll('.tool-container');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            tabLinks.forEach(l => l.classList.remove('active'));
            toolContainers.forEach(c => c.classList.remove('active'));
    
            link.classList.add('active');
            const tabId = link.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 人民币大写转换逻辑
    function convertCurrency(currencyDigits) {
        const MAXIMUM_NUMBER = 99999999999.99;
        const CN_ZERO = "零";
        const CN_ONE = "壹";
        const CN_TWO = "贰";
        const CN_THREE = "叁";
        const CN_FOUR = "肆";
        const CN_FIVE = "伍";
        const CN_SIX = "陆";
        const CN_SEVEN = "柒";
        const CN_EIGHT = "捌";
        const CN_NINE = "玖";
        const CN_TEN = "拾";
        const CN_HUNDRED = "佰";
        const CN_THOUSAND = "仟";
        const CN_TEN_THOUSAND = "万";
        const CN_HUNDRED_MILLION = "亿";
        const CN_SYMBOL = "人民币";
        const CN_DOLLAR = "元";
        const CN_TEN_CENT = "角";
        const CN_CENT = "分";
        const CN_INTEGER = "整";
    
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'none';
    
        currencyDigits = currencyDigits.toString();
        if (currencyDigits == "") {
            errorMessage.textContent = "请输入小写金额！";
            errorMessage.style.display = 'block';
            return "";
        }
        if (currencyDigits.match(/[^,.\d]/) != null) {
            errorMessage.textContent = "小写金额含有无效字符！";
            errorMessage.style.display = 'block';
            return "";
        }
        if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
            errorMessage.textContent = "小写金额的格式不正确！";
            errorMessage.style.display = 'block';
            return "";
        }
    
        currencyDigits = currencyDigits.replace(/,/g, "");
        currencyDigits = currencyDigits.replace(/^0+/, "");
        if (Number(currencyDigits) > MAXIMUM_NUMBER) {
            errorMessage.textContent = "金额过大，应小于1000亿元！";
            errorMessage.style.display = 'block';
            return "";
        }
    
        let parts = currencyDigits.split(".");
        let integral = parts[0];
        let decimal = parts.length > 1 ? parts[1].substr(0, 2) : "";
        let outputCharacters = "";
        let digits = [CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE];
        let radices = ["", CN_TEN, CN_HUNDRED, CN_THOUSAND];
        let bigRadices = ["", CN_TEN_THOUSAND, CN_HUNDRED_MILLION];
        let decimals = [CN_TEN_CENT, CN_CENT];
    
        if (Number(integral) > 0) {
            let zeroCount = 0;
            for (let i = 0; i < integral.length; i++) {
                let p = integral.length - i - 1;
                let d = integral.substr(i, 1);
                let quotient = p / 4;
                let modulus = p % 4;
                if (d == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    outputCharacters += digits[Number(d)] + radices[modulus];
                }
                if (modulus == 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                    zeroCount = 0;
                }
            }
            outputCharacters += CN_DOLLAR;
        }
    
        if (decimal != "") {
            for (let i = 0; i < decimal.length; i++) {
                let d = decimal.substr(i, 1);
                if (d != "0") {
                    outputCharacters += digits[Number(d)] + decimals[i];
                }
            }
        }
    
        if (outputCharacters == "") {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal == "") {
            outputCharacters += CN_INTEGER;
        }
        outputCharacters = CN_SYMBOL + outputCharacters;
        return outputCharacters;
    }
    
    function copyResult() {
        const result = document.getElementById('Result').value;
        if (!result) return;
        navigator.clipboard.writeText(result);
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.innerText = '已复制!';
        setTimeout(() => {
            copyBtn.innerText = '复制结果';
        }, 2000);
    }
    
    const rmbInput = document.getElementById('Digits');
    const rmbCharCount = document.getElementById('rmbCharCount');
    const convertBtn = document.getElementById('Convert');
    const clearRmbBtn = document.getElementById('clearRmb');
    const copyBtn = document.getElementById('copyBtn');
    
    rmbInput.addEventListener('input', () => {
        const len = rmbInput.value.length;
        rmbCharCount.textContent = len;
        document.getElementById('errorMessage').style.display = 'none';
    });
    
    convertBtn.addEventListener('click', () => {
        const result = convertCurrency(rmbInput.value);
        if (result) {
            document.getElementById('Result').value = result;
        }
    });
    
    clearRmbBtn.addEventListener('click', () => {
        rmbInput.value = '';
        document.getElementById('Result').value = '';
        rmbCharCount.textContent = '0';
        document.getElementById('errorMessage').style.display = 'none';
    });
    
    copyBtn.addEventListener('click', copyResult);
    
    // 英文字母转换逻辑
    const apaTitleConverter = text => {
        const smallWords = new Set(['a','an','the','and','but','or','for','nor','on','at','to','by','in','of','up','as','so','yet','off','if','per','via','out']);
        return text.split(' ')
            .map((word, i, arr) => {
                const isFirstOrLast = i === 0 || i === arr.length - 1;
                if (isFirstOrLast) return capitalize(word);
                if (word.includes('-')) {
                    return word.split('-').map((part, j) => 
                        j === 0 ? part : (part.length >= 4 ? capitalize(part) : part)
                    ).join('-');
                }
                return smallWords.has(word.toLowerCase()) && word.length < 4 ? word.toLowerCase() : capitalize(word);
            })
            .join(' ')
            .replace(/([.!?:]\s+)(\w)/g, (_, p1, p2) => p1 + p2.toUpperCase());
    };
    
    const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    
    const converters = {
        upper: t => t.toUpperCase(),
        lower: t => t.toLowerCase(),
        capitalize: t => t.replace(/\b\w/g, c => c.toUpperCase()),
        sentence: t => t.toLowerCase().replace(/(^|[.!?]\s+)\w/g, c => c.toUpperCase()),
        title: apaTitleConverter,
        blank2underscore: t => t.replace(/\s+/g, '_'),
        mixed2camel: t => t.replace(/[-_\s]+(\w)/g, (_, c) => c.toUpperCase()),
        camel2underscore: t => t.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase(),
        camel2blank: t => t.replace(/([a-z])([A-Z])/g, '$1 $2'),
        blank2midline: t => t.replace(/\s+/g, '-'),
        underscore2midline: t => t.replace(/_+/g, '-'),
        midline2underscore: t => t.replace(/-+/g, '_'),
        underscore2blank: t => t.replace(/_+/g, ' '),
        underscore2dot: t => t.replace(/_+/g, '.'),
        dot2underscore: t => t.replace(/\.+/g, '_'),
        blank2newline: t => t.replace(/\s+/g, '\n'),
        newline2blank: t => t.replace(/\n+/g, ' '),
        trim: t => t.trim(),
        clean: t => t.replace(/[^\w\s]/g, ''),
        removeBreaks: t => t.replace(/\n+/g, '')
    };
    
    const textarea = document.getElementById('sourceText');
    const outputContainer = document.getElementById('outputContainer');
    const outputText = document.getElementById('outputText');
    const charCount = document.getElementById('charCount');
    const resultLength = document.getElementById('resultLength');
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    
    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = document.querySelector('input[name="mode"]:checked').value;
            outputContainer.style.display = mode === 'new' ? 'block' : 'none';
        });
    });
    
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        charCount.textContent = len;
        resultLength.textContent = len;
    });
    
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const mode = document.querySelector('input[name="mode"]:checked').value;
            
            if (action === 'copy') {
                const textToCopy = mode === 'new' ? outputText.value : textarea.value;
                if (!textToCopy) return;
                navigator.clipboard.writeText(textToCopy);
                btn.textContent = '已复制!';
                setTimeout(() => btn.textContent = '复制结果', 1000);
                return;
            }
    
            if (action === 'clear') {
                textarea.value = '';
                outputText.value = '';
                outputContainer.style.display = 'none';
                charCount.textContent = '0';
                resultLength.textContent = '0';
                return;
            }
    
            const convertedText = converters[action](textarea.value);
            if (mode === 'replace') {
                textarea.value = convertedText;
                outputContainer.style.display = 'none';
            } else {
                outputText.value = convertedText;
                outputContainer.style.display = 'block';
            }
    
            const len = convertedText.length;
            charCount.textContent = textarea.value.length;
            resultLength.textContent = len;
        });
    });
    
    // 特殊字符检查及转换逻辑
    function isSpecialChar(code) {
        return code > 127 || code === 42 || code === 9;
    }
    
    const nonAsciiMap = new Map();
    nonAsciiMap.set("？".charCodeAt(0), "?");
    nonAsciiMap.set("，".charCodeAt(0), ",");
    nonAsciiMap.set("。".charCodeAt(0), ".");
    nonAsciiMap.set("：".charCodeAt(0), ":");
    nonAsciiMap.set("！".charCodeAt(0), "!");
    nonAsciiMap.set("（".charCodeAt(0), "(");
    nonAsciiMap.set("）".charCodeAt(0), ")");
    nonAsciiMap.set("*".charCodeAt(0), " ");
    nonAsciiMap.set("\t".charCodeAt(0), " ");
    
    const specialCharConverters = {
        native2ascii: () => {
            const characters = document.getElementById("n_source").value.split("");
            let ascii = "";
            let logText = "";
            for (let i = 0; i < characters.length; i++) {
                const code = characters[i].charCodeAt(0);
                if (isSpecialChar(code)) {
                    let charAscii = code.toString(16);
                    charAscii = "0000".substring(charAscii.length, 4) + charAscii;
                    ascii += `<span style='color:red'>\\u${charAscii}</span>`;
                    logText += `找到: ${characters[i]} (${i + 1})<br/>`;
                } else {
                    ascii += characters[i];
                }
            }
            document.getElementById("a_source").style.display = "none";
            document.getElementById("a_source_div").innerHTML = ascii;
            document.getElementById("a_source_div").style.display = "block";
            document.getElementById("tLog").innerHTML = logText;
        },
        native2asciiremove: () => {
            const characters = document.getElementById("n_source").value.split("");
            let ascii = "";
            let logText = "";
            for (let i = 0; i < characters.length; i++) {
                const code = characters[i].charCodeAt(0);
                if (isSpecialChar(code)) {
                    logText += `去除: ${characters[i]} (${i + 1})<br/>`;
                } else {
                    ascii += characters[i];
                }
            }
            document.getElementById("a_source").value = ascii;
            document.getElementById("a_source").style.display = "block";
            document.getElementById("a_source_div").style.display = "none";
            document.getElementById("tLog").innerHTML = logText;
        },
        native2asciireplaceremove: () => {
            const characters = document.getElementById("n_source").value.split("");
            let ascii = "";
            let logText = "";
            for (let i = 0; i < characters.length; i++) {
                const code = characters[i].charCodeAt(0);
                if (isSpecialChar(code)) {
                    if (nonAsciiMap.has(code)) {
                        ascii += nonAsciiMap.get(code);
                        logText += `替换: ${characters[i]} (${i + 1}) 为: ${nonAsciiMap.get(code)}<br/>`;
                    } else {
                        logText += `去除: ${characters[i]} (${i + 1})<br/>`;
                    }
                } else {
                    ascii += characters[i];
                }
            }
            document.getElementById("a_source").value = ascii;
            document.getElementById("a_source").style.display = "block";
            document.getElementById("a_source_div").style.display = "none";
            document.getElementById("tLog").innerHTML = logText;
        },
        ascii2native: () => {
            const characters = document.getElementById("a_source").value.split("\\u");
            let nativeText = characters[0];
            for (let i = 1; i < characters.length; i++) {
                const code = characters[i];
                nativeText += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
                if (code.length > 4) {
                    nativeText += code.substring(4, code.length);
                }
            }
            document.getElementById("n_source").value = nativeText;
            document.getElementById("a_source").style.display = "block";
            document.getElementById("a_source_div").style.display = "none";
            document.getElementById("tLog").innerHTML = "";
        }
    };
    
    const specialCharText = document.getElementById('n_source');
    const specialCharOutput = document.getElementById('a_source');
    const specialCharOutputDiv = document.getElementById('a_source_div');
    const specialCharCount = document.getElementById('specialCharCount');
    
    specialCharText.addEventListener('input', () => {
        const len = specialCharText.value.length;
        if (len > 5000) {
            specialCharText.value = specialCharText.value.slice(0, 5000);
            alert('输入超过5000字符限制！');
        }
        specialCharCount.textContent = specialCharText.value.length;
    });
    
    document.querySelectorAll('#special-char-converter .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
    
            if (action === 'specialCharCopy') {
                const textToCopy = specialCharOutput.style.display === "block" ? specialCharOutput.value : specialCharOutputDiv.innerText.replace(/\\u[0-9a-fA-F]{4}/g, match => String.fromCharCode(parseInt(match.substring(2), 16)));
                if (!textToCopy) return;
                navigator.clipboard.writeText(textToCopy);
                btn.textContent = '已复制!';
                setTimeout(() => btn.textContent = '复制结果', 1000);
                return;
            }
    
            if (action === 'specialCharClear') {
                specialCharText.value = '';
                specialCharOutput.value = '';
                specialCharOutputDiv.innerHTML = '';
                specialCharOutput.style.display = "block";
                specialCharOutputDiv.style.display = "none";
                specialCharCount.textContent = '0';
                document.getElementById('tLog').innerHTML = '';
                return;
            }
    
            specialCharConverters[action]();
            specialCharCount.textContent = specialCharText.value.length;
        });
    });
    
    // 在线数字转英文逻辑
    function convertToEnglish() {
        const errorMessage = document.getElementById("numberErrorMessage");
        const numberOutput = document.getElementById("txtOutput");
        errorMessage.style.display = "none";
        numberOutput.value = ""; // Clear output initially
    
        let strOriginal = document.getElementById("txtSource").value;
        if (!strOriginal) {
            errorMessage.textContent = "请输入数字金额！";
            errorMessage.style.display = "block";
            return;
        }
    
        strOriginal = strOriginal.replace(/,/g, '');
        strOriginal = strOriginal.replace(/，/g, '');
        strOriginal = strOriginal.replace(/。/g, '.');
    
        if (!/^\d*\.?\d{0,2}$/.test(strOriginal) || strOriginal.match(/[^.\d]/) != null) {
            errorMessage.textContent = "请输入有效的数字格式（例如：1234.56）";
            errorMessage.style.display = "block";
            return;
        }
    
        if (Number(strOriginal) > 999999999999.99) {
            errorMessage.textContent = "数字过大，应小于1000亿！";
            errorMessage.style.display = "block";
            return;
        }
    
        let str = strOriginal;
        if (str.indexOf(".") !== -1) {
            let s = str.substr(0, str.indexOf("."));
            let e = str.substr(str.indexOf(".") + 1, str.length);
            if (e.length === 0) str = str + "00";
            if (e.length === 1) str = str + "0";
        } else {
            str = str + ".00";
        }
    
        const english = englishMoney(str, strOriginal);
        numberOutput.value = english;
    }
    
    function englishMoney(num, strOriginal) {
        let str = '000000000000000' + num.toString();
        const numbers = 'one       two       three     four      five      ' +
            'six       seven     eight     nine      ten       ' +
            'eleven    twelve    thirteen  fourteen  fifteen   ' +
            'sixteen   seventeen eighteen  nineteen  ' +
            'twenty    thirty    forty     fifty     ' +
            'sixty     seventy   eighty    ninety    ';
    
        String.prototype.Trim = function () { return this.replace(/^\s+|\s+$/g, ""); };
        String.prototype.Ltrim = function () { return this.replace(/^\s+/g, ""); };
        String.prototype.Rtrim = function () { return this.replace(/\s+$/g, ""); };
    
        let s = str.substring(str.length - 15, str.length);
        let billion = parseInt(s.substring(0, 3));
        let million = parseInt(s.substring(3, 6));
        let thousand = parseInt(s.substring(6, 9));
        let result = '';
        let i = 0;
    
        while (i <= 3) {
            let hundreds = parseInt(s.substring(i * 3, i * 3 + 1));
            let tenth = parseInt(s.substring(i * 3 + 1, i * 3 + 2));
            let one;
            if (tenth === 1) {
                one = 10 + parseInt(s.substring(i * 3 + 2, i * 3 + 3));
            } else {
                one = 0 + parseInt(s.substring(i * 3 + 2, i * 3 + 3));
            }
    
            if (tenth <= 1) tenth = 0;
    
            if ((i === 1 && billion > 0 && (million > 0 || thousand > 0 || hundreds > 0)) ||
                (i === 2 && (billion > 0 || million > 0) && (thousand > 0 || hundreds > 0)) ||
                (i === 3 && (billion > 0 || million > 0 || thousand > 0) && (hundreds > 0))) {
                result = result + ', ';
            }
    
            if (i === 3 && (billion > 0 || million > 0 || thousand > 0) && (hundreds === 0 && (tenth > 0 || one > 0))) {
                result = result + ' and ';
            }
    
            if (hundreds > 0) {
                result = result + numbers.substring(hundreds * 10 - 10, hundreds * 10).Rtrim() + ' hundred';
            }
    
            if (tenth >= 2 && tenth <= 9) {
                if (hundreds > 0) result = result + ' and ';
                result = result + numbers.substring(tenth * 10 + 170, tenth * 10 + 180).Rtrim();
            }
    
            if (one >= 1 && one <= 19) {
                if (tenth > 0) {
                    result = result + '-';
                } else {
                    if (hundreds > 0) result = result + ' and ';
                }
                result = result + numbers.substring(one * 10 - 10, one * 10).Rtrim();
            }
    
            if (i === 0 && billion > 0) result = result + ' billion';
            if (i === 1 && million > 0) result = result + ' million';
            if (i === 2 && thousand > 0) result = result + ' thousand';
            i = i + 1;
        }
    
        if (s.substring(13, 15) !== '00') {
            result = result + ' point ';
            if (s.substring(13, 14) === '0') {
                result = result + 'zero';
                if (s.substring(14, 15) !== '0') {
                    result = result + ' ' + numbers.substring(parseInt(s.substring(14, 15)) * 10 - 10, parseInt(s.substring(14, 15)) * 10).Rtrim();
                }
            } else {
                let decimalPart = strOriginal.substring(strOriginal.indexOf(".") + 1, strOriginal.indexOf(".") + 3);
                let decimalPartInt = parseInt(decimalPart);
                if (decimalPartInt > 9) {
                    let tenth = parseInt(s.substring(13, 14));
                    let one;
                    if (tenth === 1) {
                        one = 10 + parseInt(s.substring(14, 15));
                    } else {
                        one = 0 + parseInt(s.substring(14, 15));
                    }
    
                    if (tenth <= 1) tenth = 0;
    
                    if (tenth >= 2 && tenth <= 9) {
                        result = result + numbers.substring(tenth * 10 + 170, tenth * 10 + 180).Rtrim();
                    }
    
                    if (one >= 1 && one <= 19) {
                        if (tenth > 0) result = result + '-';
                        result = result + numbers.substring(one * 10 - 10, one * 10).Rtrim();
                    }
                } else {
                    let one = parseInt(s.substring(13, 14));
                    result = result + numbers.substring(one * 10 - 10, one * 10).Rtrim();
                }
            }
        }
    
        return result.toUpperCase();
    }
    
    const numberInput = document.getElementById('txtSource');
    const numberOutput = document.getElementById('txtOutput');
    const numberCharCount = document.getElementById('numberCharCount');
    const clearNumberBtn = document.getElementById('clearNumberBtn');
    const numberCopyBtn = document.getElementById('numberCopyBtn');
    
    numberInput.addEventListener('input', () => {
        const len = numberInput.value.length;
        if (len > 20) {
            numberInput.value = numberInput.value.slice(0, 20);
            alert('输入超过20字符限制！');
        }
        numberCharCount.textContent = len;
        document.getElementById('numberErrorMessage').style.display = 'none';
        convertToEnglish(); // Trigger conversion on input
    });
    
    clearNumberBtn.addEventListener('click', () => {
        numberInput.value = '';
        numberOutput.value = '';
        numberCharCount.textContent = '0';
        document.getElementById('numberErrorMessage').style.display = 'none';
    });
    
    numberCopyBtn.addEventListener('click', () => {
        const result = numberOutput.value;
        if (!result) return;
        navigator.clipboard.writeText(result);
        numberCopyBtn.innerText = '已复制!';
        setTimeout(() => {
            numberCopyBtn.innerText = '复制结果';
        }, 2000);
    });
        // 中文转拼音逻辑
        const pinyinInput = document.getElementById('i_source');
        const pinyinOutput = document.getElementById('txtOutput');
        const pinyinCharCount = document.getElementById('pinyinCharCount');
        const firstUpCase = document.getElementById('firstUpCase');
        const useSpace = document.getElementById('cbSpace');
        const pinyinCopyBtn = document.getElementById('pinyinCopyBtn');
        const pinyinClearBtn = document.getElementById('pinyinClearBtn');
    
        // Fallback Pinyin mapping for testing (if ctpinyin.js fails)
        const pinyinMap = {
            '你': 'ni',
            '好': 'hao',
            // Add more mappings as needed for testing
        };
    
        function convertToPinyin() {
            const text = pinyinInput.value.trim();
            pinyinOutput.value = ''; // Clear output initially
    
            if (!text) {
                pinyinCharCount.textContent = '0';
                return; // Exit if input is empty
            }
    
            try {
                // Configure Pinyin options based on checkboxes
                const connection = useSpace.checked ? ' ' : '';
                pinyin.init({
                    firstUpCase: firstUpCase.checked,
                    connection: connection
                });
    
                // Convert the Chinese text to Pinyin
                let result = pinyin.getFullChars(text);
    
                if (!result) {
                    // Fallback: Use manual mapping if pinyin library fails
                    console.warn('Pinyin library returned no result, using fallback mapping.');
                    const chars = text.split('');
                    const pinyinArray = chars.map(char => pinyinMap[char] || char);
                    result = pinyinArray.join(connection);
    
                    // Apply first letter capitalization if enabled
                    if (firstUpCase.checked) {
                        result = result
                            .split(connection || ' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(connection);
                    }
                }
    
                // Update the output
                pinyinOutput.value = result;
                pinyinCharCount.textContent = text.length;
            } catch (error) {
                console.error('Pinyin conversion error:', error);
                // Fallback: Use manual mapping on error
                const chars = text.split('');
                const pinyinArray = chars.map(char => pinyinMap[char] || char);
                let result = pinyinArray.join(useSpace.checked ? ' ' : '');
    
                // Apply first letter capitalization if enabled
                if (firstUpCase.checked) {
                    result = result
                        .split(useSpace.checked ? ' ' : ' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(useSpace.checked ? ' ' : '');
                }
    
                pinyinOutput.value = result;
                pinyinCharCount.textContent = text.length;
            }
        }
    
        // Initial conversion on page load
        convertToPinyin();
    
        // Real-time conversion on input
        pinyinInput.addEventListener('input', convertToPinyin);
    
        // Real-time conversion on checkbox change
        firstUpCase.addEventListener('change', convertToPinyin);
        useSpace.addEventListener('change', convertToPinyin);
    
        // Copy button functionality
        pinyinCopyBtn.addEventListener('click', () => {
            const result = pinyinOutput.value;
            if (!result) return;
            navigator.clipboard.writeText(result);
            pinyinCopyBtn.innerText = '已复制!';
            setTimeout(() => {
                pinyinCopyBtn.innerText = '复制结果';
            }, 2000);
        });
    
        // Clear button functionality
        pinyinClearBtn.addEventListener('click', () => {
            pinyinInput.value = '';
            pinyinOutput.value = '';
            pinyinCharCount.textContent = '0';
        });
    });
