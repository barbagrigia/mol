# $mol_dimmer

Output text with dimmed not matched substrings.

## [Online demo](http://eigenmethod.github.io/mol/#demo=mol_dimmer_demo)

## Usage example
```
$my_eggs $mol_dimmer
	haystack \Don't put all your eggs in one basket
	needle \eggs
```

## Properties

**`haystack() : string`**

Property `haystack` is a string a needle will be looked in.

**`needle() : string`**

Property `needle' is a key to find substring in haystack.
