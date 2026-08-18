Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.

For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class AutocompleteSystem {
    constructor(words) {
        this.root = new TrieNode();
        // Preprocess the dictionary into the Trie
        for (const word of words) {
            this.insert(word);
        }
    }

    /**
     * Inserts a word into the trie structure.
     * @param {string} word 
     */
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    /**
     * Helper function to perform depth-first search to collect words.
     * @param {TrieNode} node 
     * @param {string} prefix 
     * @param {string[]} results 
     */
    _dfs(node, prefix, results) {
        if (node.isEndOfWord) {
            results.push(prefix);
        }

        for (const char in node.children) {
            this._dfs(node.children[char], prefix + char, results);
        }
    }

    /**
     * Returns all words in the dictionary that start with the given prefix.
     * @param {string} prefix 
     * @returns {string[]}
     */
    searchPrefix(prefix) {
        let node = this.root;

        // Navigate to the end of the input prefix
        for (const char of prefix) {
            if (!node.children[char]) {
                return []; // Prefix doesn't exist in our dictionary
            }
            node = node.children[char];
        }

        // Collect all words branching off from this point
        const results = [];
        this._dfs(node, prefix, results);
        return results;
    }
}

// --- Example Usage ---
const dictionary = ["dog", "deer", "deal", "cat", "dodge"];
const autocomplete = new AutocompleteSystem(dictionary);

const query1 = "de";
console.log(`Suggestions for '${query1}':`, autocomplete.searchPrefix(query1)); 
// Output: [ 'deer', 'deal' ]

const query2 = "do";
console.log(`Suggestions for '${query2}':`, autocomplete.searchPrefix(query2)); 
// Output: [ 'dog', 'dodge' ]
