/**
 * 
 * @param word: word to be validated
 * @returns 
 */
export function validateWord(word: string): { isValid: boolean; errMessage: string; } {
    const MAX_LEN_WORD = 30;
    // allowed unicode properties: Letter, Number, 
    const ALLOWED_UNICODE_PROP_LIST: Array<string> = ["L", "N", ];
    const REGEXP_ALLOWED_UNICODE_PROPS = createRegexpUnicodeGu(ALLOWED_UNICODE_PROP_LIST);
    const ALLOWED_INDIVIDUAL_CHARACTER_LIST = [".", ",", " ", "　", '"', "'", "`", "_", 
                                               "-", "、", "。", "「", "」", "!", "?", "！", 
                                               "？", "^", "~", "ー", "(", ")", "{", "}", 
                                               "[", "]", "%", "％", "‘", "’", ];

    // raise an error if word length is longer than maxLen 
    if (word.length > MAX_LEN_WORD) {
        return {
            isValid: false,
            errMessage: `${MAX_LEN_WORD}자 이내로 입력해 주세요.`,
        };
    }

    const normalizedWord = word.normalize("NFC");
    const invalidCharacterList = normalizedWord.match(REGEXP_ALLOWED_UNICODE_PROPS);
    const isNotIncluded = (elem) => !(ALLOWED_INDIVIDUAL_CHARACTER_LIST.includes(elem));
    function x(params:string) {
        return !(ALLOWED_INDIVIDUAL_CHARACTER_LIST.includes(params));
    }
    // raise an error if...
    // 1. word includes characters that are not letters or numbers, and
    // 2. at least one of them are not the element of ALLOWED_INDIVIDUAL_CHARACTER_LIST
    if (invalidCharacterList !== null){
        if (invalidCharacterList.some(isNotIncluded)) {
            return {
                isValid: false,
                errMessage: "사용 할 수 없는 문자가 포함되어 있습니다.",
            };
        }
    }

    // this must be at the end of this function
    // set isValid as true if the given word passes all the validation
    return {
        isValid: true,
        errMessage: "",
    }
}

export function validateDescription(word: string): { isValid: boolean; errMessage: string; } {
    const MAX_LEN_DESCRIPTION = 200;
    // allowed unicode properties: Letter, Number, 
    const ALLOWED_UNICODE_PROP_LIST: Array<string> = ["L", "N", ];
    const REGEXP_ALLOWED_UNICODE_PROPS = createRegexpUnicodeGu(ALLOWED_UNICODE_PROP_LIST);
    const ALLOWED_INDIVIDUAL_CHARACTER_LIST = [".", ",", " ", "　", '"', "'", "`", "_", 
                                               "-", "、", "。", "「", "」", "!", "?", "！", 
                                               "？", "^", "~", "ー", "(", ")", "{", "}", 
                                               "[", "]", "%", "％", "‘", "’", ];

    // raise an error if description length is longer than maxLen 
    if (word.length > MAX_LEN_DESCRIPTION) {
        return {
            isValid: false,
            errMessage: `${MAX_LEN_DESCRIPTION}자 이내로 입력해 주세요.`,
        };
    }

    const normalizedWord = word.normalize("NFC");
    const invalidCharacterList = normalizedWord.match(REGEXP_ALLOWED_UNICODE_PROPS);
    const isNotIncluded = (elem) => !(ALLOWED_INDIVIDUAL_CHARACTER_LIST.includes(elem));
    function x(params:string) {
        return !(ALLOWED_INDIVIDUAL_CHARACTER_LIST.includes(params));
    }
    // raise an error if...
    // 1. word includes characters that are not letters or numbers, and
    // 2. at least one of them are not the element of ALLOWED_INDIVIDUAL_CHARACTER_LIST
    if (invalidCharacterList !== null){
        if (invalidCharacterList.some(isNotIncluded)) {
            return {
                isValid: false,
                errMessage: "사용 할 수 없는 문자가 포함되어 있습니다.",
            };
        }
    }

    // this must be at the end of this function
    // set isValid as true if the given word passes all the validation
    return {
        isValid: true,
        errMessage: "",
    }
}

export function createRegexpUnicodeGu(unicodeList: Array<string>): RegExp {
    let regexp = "[^";
    let test: null = null;
    for (const elem of unicodeList) {
        regexp += `\\p{${elem}}`;
    }
    regexp += "]";
    return new RegExp(regexp, 'gu');
}