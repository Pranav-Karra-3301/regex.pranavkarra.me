export interface TestString {
  text: string;
  shouldMatch: boolean;
}

export interface Lesson {
  title: string;
  description: string;
  concept: string;
  testStrings: TestString[];
  solution: string;
  hints: string[];
}

export interface Module {
  module: string;
  lessons: Lesson[];
}

export const curriculum: Module[] = [
  // Module 1: Basics
  {
    module: "Basics",
    lessons: [
      {
        title: "Literal Characters",
        description: "Match exact characters in text",
        concept: "The simplest regex patterns match literal characters exactly as they appear. For example, <code>cat</code> matches the exact sequence 'cat' in text.",
        testStrings: [
          { text: 'cat', shouldMatch: true },
          { text: 'The cat sat', shouldMatch: true },
          { text: 'category', shouldMatch: true },
          { text: 'dog', shouldMatch: false },
          { text: 'CAT', shouldMatch: false }
        ],
        solution: 'cat',
        hints: [
          'Simply type the exact characters you want to match',
          'Remember: regex is case-sensitive by default',
          'Solution: cat'
        ]
      },
      {
        title: "The Dot Wildcard",
        description: "Use . to match any single character",
        concept: "The dot <code>.</code> is a wildcard that matches any single character except line breaks. For example, <code>c.t</code> matches 'cat', 'cot', 'cut', etc.",
        testStrings: [
          { text: 'cat', shouldMatch: true },
          { text: 'cot', shouldMatch: true },
          { text: 'cut', shouldMatch: true },
          { text: 'ct', shouldMatch: false },
          { text: 'cart', shouldMatch: false }
        ],
        solution: 'c.t',
        hints: [
          'Use . to match any single character',
          'Pattern: c_t where _ is any character',
          'Solution: c.t'
        ]
      },
      {
        title: "Escaping Special Characters",
        description: "Match literal dots and other special characters",
        concept: "To match special regex characters literally (like . * + ? etc.), escape them with a backslash. <code>\\.</code> matches a literal dot.",
        testStrings: [
          { text: 'file.txt', shouldMatch: true },
          { text: 'image.jpg', shouldMatch: true },
          { text: 'doc.pdf', shouldMatch: true },
          { text: 'file-txt', shouldMatch: false },
          { text: 'filetxt', shouldMatch: false }
        ],
        solution: '\\.',
        hints: [
          'You need to match a literal dot',
          'Escape special characters with backslash',
          'Solution: \\.'
        ]
      }
    ]
  },
  // Module 2: Character Classes
  {
    module: "Character Classes",
    lessons: [
      {
        title: "Character Sets [abc]",
        description: "Match any one character from a set",
        concept: "Square brackets <code>[abc]</code> create a character set that matches any ONE of the enclosed characters. <code>[aeiou]</code> matches any vowel.",
        testStrings: [
          { text: 'cat', shouldMatch: true },
          { text: 'bat', shouldMatch: true },
          { text: 'rat', shouldMatch: true },
          { text: 'mat', shouldMatch: false },
          { text: 'sat', shouldMatch: false }
        ],
        solution: '[cbr]at',
        hints: [
          'Use square brackets to match one of several characters',
          'Match words ending in "at" that start with c, b, or r',
          'Solution: [cbr]at'
        ]
      },
      {
        title: "Character Ranges [a-z]",
        description: "Match characters in a range",
        concept: "Use a hyphen inside brackets to specify a range. <code>[a-z]</code> matches any lowercase letter, <code>[0-9]</code> matches any digit.",
        testStrings: [
          { text: 'a', shouldMatch: true },
          { text: 'm', shouldMatch: true },
          { text: 'z', shouldMatch: true },
          { text: 'A', shouldMatch: false },
          { text: '5', shouldMatch: false }
        ],
        solution: '[a-z]',
        hints: [
          'Use a hyphen to specify a range of characters',
          'Match any lowercase letter',
          'Solution: [a-z]'
        ]
      },
      {
        title: "Negated Sets [^abc]",
        description: "Match any character NOT in the set",
        concept: "A caret <code>^</code> at the start of a character set negates it. <code>[^0-9]</code> matches any non-digit character.",
        testStrings: [
          { text: 'a', shouldMatch: true },
          { text: 'b', shouldMatch: true },
          { text: '!', shouldMatch: true },
          { text: '5', shouldMatch: false },
          { text: '9', shouldMatch: false }
        ],
        solution: '[^0-9]',
        hints: [
          'Use ^ inside brackets to negate the set',
          'Match anything that is NOT a digit',
          'Solution: [^0-9]'
        ]
      },
      {
        title: "Digit Shorthand \\d",
        description: "Use \\d to match any digit",
        concept: "The <code>\\d</code> character class is shorthand for <code>[0-9]</code>. It matches any single digit.",
        testStrings: [
          { text: '0', shouldMatch: true },
          { text: '5', shouldMatch: true },
          { text: '9', shouldMatch: true },
          { text: 'a', shouldMatch: false },
          { text: '!', shouldMatch: false }
        ],
        solution: '\\d',
        hints: [
          'Use the digit character class',
          'Shorthand for [0-9]',
          'Solution: \\d'
        ]
      },
      {
        title: "Non-Digit \\D",
        description: "Match any non-digit character",
        concept: "The <code>\\D</code> character class is shorthand for <code>[^0-9]</code>. It matches any character that is NOT a digit.",
        testStrings: [
          { text: 'a', shouldMatch: true },
          { text: 'Z', shouldMatch: true },
          { text: '!', shouldMatch: true },
          { text: '5', shouldMatch: false },
          { text: '0', shouldMatch: false }
        ],
        solution: '\\D',
        hints: [
          'Use the non-digit character class',
          'Opposite of \\d',
          'Solution: \\D'
        ]
      },
      {
        title: "Word Characters \\w",
        description: "Match letters, digits, and underscore",
        concept: "The <code>\\w</code> character class matches word characters: <code>[A-Za-z0-9_]</code>. Useful for matching variable names.",
        testStrings: [
          { text: 'a', shouldMatch: true },
          { text: '5', shouldMatch: true },
          { text: '_', shouldMatch: true },
          { text: '-', shouldMatch: false },
          { text: '!', shouldMatch: false }
        ],
        solution: '\\w',
        hints: [
          'Use the word character class',
          'Matches letters, digits, and underscore',
          'Solution: \\w'
        ]
      },
      {
        title: "Whitespace \\s",
        description: "Match spaces, tabs, and newlines",
        concept: "The <code>\\s</code> character class matches any whitespace character including spaces, tabs, and line breaks.",
        testStrings: [
          { text: ' ', shouldMatch: true },
          { text: '\t', shouldMatch: true },
          { text: '\n', shouldMatch: true },
          { text: 'a', shouldMatch: false },
          { text: '5', shouldMatch: false }
        ],
        solution: '\\s',
        hints: [
          'Use the whitespace character class',
          'Matches spaces, tabs, newlines',
          'Solution: \\s'
        ]
      }
    ]
  },
  // Module 3: Anchors & Boundaries
  {
    module: "Anchors & Boundaries",
    lessons: [
      {
        title: "Start Anchor ^",
        description: "Match patterns at the beginning of text",
        concept: "The caret <code>^</code> anchor matches the start of a string. <code>^Hello</code> only matches 'Hello' at the beginning.",
        testStrings: [
          { text: 'Hello world', shouldMatch: true },
          { text: 'Hello there', shouldMatch: true },
          { text: 'Say Hello', shouldMatch: false },
          { text: 'hello world', shouldMatch: false }
        ],
        solution: '^Hello',
        hints: [
          'Use ^ to match the start of the string',
          'Must match "Hello" at the beginning',
          'Solution: ^Hello'
        ]
      },
      {
        title: "End Anchor $",
        description: "Match patterns at the end of text",
        concept: "The dollar sign <code>$</code> anchor matches the end of a string. <code>world$</code> only matches 'world' at the end.",
        testStrings: [
          { text: 'Hello world', shouldMatch: true },
          { text: 'world', shouldMatch: true },
          { text: 'world peace', shouldMatch: false },
          { text: 'worldwide', shouldMatch: false }
        ],
        solution: 'world$',
        hints: [
          'Use $ to match the end of the string',
          'Must match "world" at the end',
          'Solution: world$'
        ]
      },
      {
        title: "Word Boundary \\b",
        description: "Match whole words only",
        concept: "The <code>\\b</code> assertion matches a word boundary - the position between a word character and a non-word character.",
        testStrings: [
          { text: 'cat', shouldMatch: true },
          { text: 'the cat sat', shouldMatch: true },
          { text: 'category', shouldMatch: false },
          { text: 'scatter', shouldMatch: false }
        ],
        solution: '\\bcat\\b',
        hints: [
          'Use \\b for word boundaries',
          'Match "cat" as a whole word only',
          'Solution: \\bcat\\b'
        ]
      },
      {
        title: "Non-Word Boundary \\B",
        description: "Match within words, not at boundaries",
        concept: "The <code>\\B</code> assertion matches a non-word boundary - positions where both sides are word characters or both are non-word characters.",
        testStrings: [
          { text: 'category', shouldMatch: true },
          { text: 'scatter', shouldMatch: true },
          { text: 'cat', shouldMatch: false },
          { text: 'the cat', shouldMatch: false }
        ],
        solution: '\\Bcat',
        hints: [
          'Use \\B for non-word boundaries',
          'Match "cat" within a word, not at the start',
          'Solution: \\Bcat'
        ]
      }
    ]
  },
  // Module 4: Quantifiers
  {
    module: "Quantifiers",
    lessons: [
      {
        title: "Zero or More *",
        description: "Match 0 or more occurrences",
        concept: "The asterisk <code>*</code> quantifier matches zero or more of the preceding element. <code>ab*</code> matches 'a', 'ab', 'abb', etc.",
        testStrings: [
          { text: 'a', shouldMatch: true },
          { text: 'ab', shouldMatch: true },
          { text: 'abbb', shouldMatch: true },
          { text: 'b', shouldMatch: false },
          { text: 'ba', shouldMatch: false }
        ],
        solution: 'ab*',
        hints: [
          'Use * to match zero or more',
          'Match "a" followed by zero or more "b"s',
          'Solution: ab*'
        ]
      },
      {
        title: "One or More +",
        description: "Match 1 or more occurrences",
        concept: "The plus <code>+</code> quantifier matches one or more of the preceding element. <code>ab+</code> requires at least one 'b'.",
        testStrings: [
          { text: 'ab', shouldMatch: true },
          { text: 'abbb', shouldMatch: true },
          { text: 'a', shouldMatch: false },
          { text: 'b', shouldMatch: false },
          { text: 'ba', shouldMatch: false }
        ],
        solution: 'ab+',
        hints: [
          'Use + to match one or more',
          'Match "a" followed by one or more "b"s',
          'Solution: ab+'
        ]
      },
      {
        title: "Optional ?",
        description: "Match 0 or 1 occurrence",
        concept: "The question mark <code>?</code> makes the preceding element optional (0 or 1 occurrence). <code>colou?r</code> matches both 'color' and 'colour'.",
        testStrings: [
          { text: 'color', shouldMatch: true },
          { text: 'colour', shouldMatch: true },
          { text: 'colouur', shouldMatch: false },
          { text: 'colr', shouldMatch: false }
        ],
        solution: 'colou?r',
        hints: [
          'Use ? to make something optional',
          'Match both "color" and "colour"',
          'Solution: colou?r'
        ]
      },
      {
        title: "Exact Count {n}",
        description: "Match exactly n occurrences",
        concept: "Curly braces <code>{n}</code> specify an exact count. <code>\\d{4}</code> matches exactly 4 digits.",
        testStrings: [
          { text: '1234', shouldMatch: true },
          { text: '5678', shouldMatch: true },
          { text: '123', shouldMatch: false },
          { text: '12345', shouldMatch: false },
          { text: 'abcd', shouldMatch: false }
        ],
        solution: '\\d{4}',
        hints: [
          'Use {n} to match exactly n times',
          'Match exactly 4 digits',
          'Solution: \\d{4}'
        ]
      },
      {
        title: "Range {n,m}",
        description: "Match between n and m occurrences",
        concept: "Use <code>{n,m}</code> to match between n and m occurrences. <code>\\d{2,4}</code> matches 2, 3, or 4 digits.",
        testStrings: [
          { text: '12', shouldMatch: true },
          { text: '123', shouldMatch: true },
          { text: '1234', shouldMatch: true },
          { text: '1', shouldMatch: false },
          { text: '12345', shouldMatch: false }
        ],
        solution: '^\\d{2,4}$',
        hints: [
          'Use {n,m} to match a range of occurrences',
          'Match 2 to 4 digits (use anchors for exact match)',
          'Solution: ^\\d{2,4}$'
        ]
      },
      {
        title: "Lazy Quantifiers",
        description: "Match as few as possible with ?",
        concept: "Adding <code>?</code> after a quantifier makes it lazy (non-greedy). <code>.*?</code> matches as few characters as possible.",
        testStrings: [
          { text: '<div>content</div>', shouldMatch: true },
          { text: '<span>text</span>', shouldMatch: true },
          { text: 'no tags here', shouldMatch: false }
        ],
        solution: '<.*?>',
        hints: [
          'Use ? after a quantifier to make it lazy',
          'Match HTML tags without their content',
          'Solution: <.*?>'
        ]
      }
    ]
  },
  // Module 5: Groups & Capturing
  {
    module: "Groups & Capturing",
    lessons: [
      {
        title: "Basic Groups ()",
        description: "Group patterns together",
        concept: "Parentheses <code>()</code> group patterns together. Groups can be quantified as a unit: <code>(ab)+</code> matches 'ab', 'abab', etc.",
        testStrings: [
          { text: 'ab', shouldMatch: true },
          { text: 'abab', shouldMatch: true },
          { text: 'ababab', shouldMatch: true },
          { text: 'a', shouldMatch: false },
          { text: 'abb', shouldMatch: false }
        ],
        solution: '(ab)+',
        hints: [
          'Use parentheses to group patterns',
          'Match one or more occurrences of "ab"',
          'Solution: (ab)+'
        ]
      },
      {
        title: "Alternation |",
        description: "Match one pattern OR another",
        concept: "The pipe <code>|</code> creates alternation (OR logic). <code>cat|dog</code> matches either 'cat' or 'dog'.",
        testStrings: [
          { text: 'cat', shouldMatch: true },
          { text: 'dog', shouldMatch: true },
          { text: 'bird', shouldMatch: false },
          { text: 'catdog', shouldMatch: false }
        ],
        solution: '^(cat|dog)$',
        hints: [
          'Use | for alternation (OR)',
          'Match exactly "cat" or "dog"',
          'Solution: ^(cat|dog)$'
        ]
      },
      {
        title: "Non-Capturing Groups (?:)",
        description: "Group without capturing",
        concept: "Non-capturing groups <code>(?:)</code> group patterns without creating a capture. Useful for performance and when you don't need the matched text.",
        testStrings: [
          { text: 'http://example.com', shouldMatch: true },
          { text: 'https://example.com', shouldMatch: true },
          { text: 'ftp://example.com', shouldMatch: false }
        ],
        solution: '^(?:https?://).*',
        hints: [
          'Use (?:) for non-capturing groups',
          'Match URLs starting with http:// or https://',
          'Solution: ^(?:https?://).*'
        ]
      },
      {
        title: "Named Groups (?<name>)",
        description: "Create named capture groups",
        concept: "Named groups <code>(?&lt;name&gt;)</code> create captures with names instead of numbers. Useful for extracting specific parts.",
        testStrings: [
          { text: '2024-12-25', shouldMatch: true },
          { text: '1999-01-01', shouldMatch: true },
          { text: '24-12-25', shouldMatch: false },
          { text: 'not-a-date', shouldMatch: false }
        ],
        solution: '(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})',
        hints: [
          'Use (?<name>) to create named groups',
          'Match dates in YYYY-MM-DD format',
          'Solution: (?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})'
        ]
      },
      {
        title: "Backreferences \\1",
        description: "Reference captured groups",
        concept: "Backreferences <code>\\1</code>, <code>\\2</code>, etc. match the same text as a previous capture group. Useful for finding duplicates.",
        testStrings: [
          { text: 'the the', shouldMatch: true },
          { text: 'is is', shouldMatch: true },
          { text: 'the cat', shouldMatch: false },
          { text: 'that this', shouldMatch: false }
        ],
        solution: '\\b(\\w+)\\s+\\1\\b',
        hints: [
          'Use \\1 to reference the first capture group',
          'Match repeated words',
          'Solution: \\b(\\w+)\\s+\\1\\b'
        ]
      }
    ]
  },
  // Module 6: Lookarounds
  {
    module: "Lookarounds",
    lessons: [
      {
        title: "Positive Lookahead (?=)",
        description: "Match only if followed by pattern",
        concept: "Positive lookahead <code>(?=pattern)</code> matches a position followed by the pattern, without including it in the match.",
        testStrings: [
          { text: 'test@', shouldMatch: true },
          { text: 'hello@', shouldMatch: true },
          { text: 'test!', shouldMatch: false },
          { text: 'hello', shouldMatch: false }
        ],
        solution: '\\w+(?=@)',
        hints: [
          'Use (?=) for positive lookahead',
          'Match words followed by @',
          'Solution: \\w+(?=@)'
        ]
      },
      {
        title: "Negative Lookahead (?!)",
        description: "Match only if NOT followed by pattern",
        concept: "Negative lookahead <code>(?!pattern)</code> matches a position NOT followed by the pattern.",
        testStrings: [
          { text: 'file.txt', shouldMatch: false },
          { text: 'file.jpg', shouldMatch: true },
          { text: 'document.pdf', shouldMatch: true },
          { text: 'script.txt', shouldMatch: false }
        ],
        solution: '\\w+\\.(?!txt)',
        hints: [
          'Use (?!) for negative lookahead',
          'Match filenames NOT ending with .txt',
          'Solution: \\w+\\.(?!txt)'
        ]
      },
      {
        title: "Positive Lookbehind (?<=)",
        description: "Match only if preceded by pattern",
        concept: "Positive lookbehind <code>(?&lt;=pattern)</code> matches a position preceded by the pattern.",
        testStrings: [
          { text: '$100', shouldMatch: true },
          { text: '$50', shouldMatch: true },
          { text: '€100', shouldMatch: false },
          { text: '100', shouldMatch: false }
        ],
        solution: '(?<=\\$)\\d+',
        hints: [
          'Use (?<=) for positive lookbehind',
          'Match numbers preceded by $',
          'Solution: (?<=\\$)\\d+'
        ]
      },
      {
        title: "Negative Lookbehind (?<!)",
        description: "Match only if NOT preceded by pattern",
        concept: "Negative lookbehind <code>(?&lt;!pattern)</code> matches a position NOT preceded by the pattern.",
        testStrings: [
          { text: 'cat', shouldMatch: true },
          { text: ' cat', shouldMatch: true },
          { text: '-cat', shouldMatch: false },
          { text: '_cat', shouldMatch: false }
        ],
        solution: '(?<![_-])cat',
        hints: [
          'Use (?<!) for negative lookbehind',
          'Match "cat" not preceded by _ or -',
          'Solution: (?<![_-])cat'
        ]
      }
    ]
  },
  // Module 7: Real-World Patterns
  {
    module: "Real-World Patterns",
    lessons: [
      {
        title: "Email Validation",
        description: "Match valid email addresses",
        concept: "Email validation requires matching username, @ symbol, domain, and TLD. A robust pattern handles special characters and multiple subdomains.",
        testStrings: [
          { text: 'user@example.com', shouldMatch: true },
          { text: 'test.user+tag@domain.co.uk', shouldMatch: true },
          { text: 'admin_123@company-name.org', shouldMatch: true },
          { text: '@invalid.com', shouldMatch: false },
          { text: 'user@', shouldMatch: false },
          { text: 'user@domain', shouldMatch: false }
        ],
        solution: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        hints: [
          'Username: letters, numbers, _.+-',
          'Domain: letters, numbers, hyphens',
          'Must have @ and at least one dot',
          'Solution: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        ]
      },
      {
        title: "Phone Numbers",
        description: "Match US phone number formats",
        concept: "Phone numbers can appear in various formats. A flexible pattern should handle common variations.",
        testStrings: [
          { text: '123-456-7890', shouldMatch: true },
          { text: '(123) 456-7890', shouldMatch: true },
          { text: '123.456.7890', shouldMatch: true },
          { text: '123456789', shouldMatch: false },
          { text: '12-345-6789', shouldMatch: false }
        ],
        solution: '^(\\(\\d{3}\\)|\\d{3})[\\s.-]?\\d{3}[\\s.-]?\\d{4}$',
        hints: [
          'Handle optional parentheses for area code',
          'Allow various separators: -, ., or space',
          'Pattern: 3 digits, separator, 3 digits, separator, 4 digits',
          'Solution: ^(\\(\\d{3}\\)|\\d{3})[\\s.-]?\\d{3}[\\s.-]?\\d{4}$'
        ]
      },
      {
        title: "URLs",
        description: "Match web URLs",
        concept: "URL matching should handle protocols, domains, paths, and query strings.",
        testStrings: [
          { text: 'http://example.com', shouldMatch: true },
          { text: 'https://www.google.com/search', shouldMatch: true },
          { text: 'https://github.com/user/repo', shouldMatch: true },
          { text: 'ftp://files.com', shouldMatch: false },
          { text: 'not-a-url', shouldMatch: false }
        ],
        solution: '^https?://[\\w.-]+\\.[a-z]{2,}(/.*)?$',
        hints: [
          'Start with http:// or https://',
          'Domain with at least one dot',
          'Optional path after domain',
          'Solution: ^https?://[\\w.-]+\\.[a-z]{2,}(/.*)?$'
        ]
      },
      {
        title: "IP Addresses",
        description: "Match IPv4 addresses",
        concept: "IPv4 addresses consist of four numbers (0-255) separated by dots.",
        testStrings: [
          { text: '192.168.1.1', shouldMatch: true },
          { text: '10.0.0.0', shouldMatch: true },
          { text: '255.255.255.255', shouldMatch: true },
          { text: '256.1.1.1', shouldMatch: false },
          { text: '192.168.1', shouldMatch: false }
        ],
        solution: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
        hints: [
          'Each octet: 0-255',
          'Four octets separated by dots',
          'Handle: 0-9, 10-99, 100-199, 200-249, 250-255',
          'Complex but accurate pattern needed'
        ]
      },
      {
        title: "Credit Card Numbers",
        description: "Match credit card formats",
        concept: "Credit cards typically have 13-19 digits, often displayed in groups of 4.",
        testStrings: [
          { text: '4111111111111111', shouldMatch: true },
          { text: '4111-1111-1111-1111', shouldMatch: true },
          { text: '4111 1111 1111 1111', shouldMatch: true },
          { text: '411111111111111', shouldMatch: false },
          { text: '4111-1111-1111', shouldMatch: false }
        ],
        solution: '^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$',
        hints: [
          'Four groups of 4 digits',
          'Optional spaces or hyphens between groups',
          'Total of 16 digits',
          'Solution: ^\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}$'
        ]
      },
      {
        title: "Hex Color Codes",
        description: "Match hexadecimal color codes",
        concept: "Hex colors start with # and have either 3 or 6 hexadecimal characters.",
        testStrings: [
          { text: '#FF5733', shouldMatch: true },
          { text: '#fff', shouldMatch: true },
          { text: '#000000', shouldMatch: true },
          { text: 'FF5733', shouldMatch: false },
          { text: '#GGGGGG', shouldMatch: false },
          { text: '#12345', shouldMatch: false }
        ],
        solution: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
        hints: [
          'Start with #',
          'Either 3 or 6 hex characters',
          'Hex: 0-9, A-F (case insensitive)',
          'Solution: ^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
        ]
      },
      {
        title: "Dates (ISO Format)",
        description: "Match dates in YYYY-MM-DD format",
        concept: "ISO date format with basic validation for month (01-12) and day (01-31) ranges.",
        testStrings: [
          { text: '2024-12-25', shouldMatch: true },
          { text: '1999-01-01', shouldMatch: true },
          { text: '2024-06-15', shouldMatch: true },
          { text: '2024-13-01', shouldMatch: false },
          { text: '24-12-25', shouldMatch: false },
          { text: '2024/12/25', shouldMatch: false }
        ],
        solution: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
        hints: [
          'Year: 4 digits',
          'Month: 01-12',
          'Day: 01-31',
          'Solution: ^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'
        ]
      },
      {
        title: "Time (24-hour)",
        description: "Match time in HH:MM format",
        concept: "24-hour time format with hours (00-23) and minutes (00-59).",
        testStrings: [
          { text: '00:00', shouldMatch: true },
          { text: '23:59', shouldMatch: true },
          { text: '12:30', shouldMatch: true },
          { text: '24:00', shouldMatch: false },
          { text: '12:60', shouldMatch: false },
          { text: '1:30', shouldMatch: false }
        ],
        solution: '^([01][0-9]|2[0-3]):[0-5][0-9]$',
        hints: [
          'Hours: 00-23',
          'Minutes: 00-59',
          'Both must be 2 digits',
          'Solution: ^([01][0-9]|2[0-3]):[0-5][0-9]$'
        ]
      },
      {
        title: "Passwords",
        description: "Strong password with requirements",
        concept: "Password must contain at least one uppercase, one lowercase, one digit, and be 8+ characters.",
        testStrings: [
          { text: 'Pass123!', shouldMatch: true },
          { text: 'SecureP@ss9', shouldMatch: true },
          { text: 'MyPassw0rd', shouldMatch: true },
          { text: 'password', shouldMatch: false },
          { text: 'PASSWORD123', shouldMatch: false },
          { text: 'Pass!', shouldMatch: false }
        ],
        solution: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$',
        hints: [
          'Use positive lookaheads for requirements',
          '(?=.*[a-z]) ensures lowercase',
          '(?=.*[A-Z]) ensures uppercase',
          '(?=.*\\d) ensures digit',
          'Solution: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'
        ]
      },
      {
        title: "HTML Tags",
        description: "Match HTML opening and closing tags",
        concept: "Match paired HTML tags using backreferences to ensure opening and closing tags match.",
        testStrings: [
          { text: '<div>content</div>', shouldMatch: true },
          { text: '<span>text</span>', shouldMatch: true },
          { text: '<h1>Title</h1>', shouldMatch: true },
          { text: '<div>content</span>', shouldMatch: false },
          { text: '<div>content', shouldMatch: false }
        ],
        solution: '<([a-z]+)>.*?</\\1>',
        hints: [
          'Capture the tag name',
          'Use lazy quantifier for content',
          'Backreference to match closing tag',
          'Solution: <([a-z]+)>.*?</\\1>'
        ]
      }
    ]
  }
];