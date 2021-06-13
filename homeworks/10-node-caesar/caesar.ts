import commandLineArgs from "command-line-args"
import commandLineUsage from "command-line-usage"
import stream from "stream/promises"
import fs from "fs"

const optionDefinitions = [
  {name: "help", alias: "h", type: Boolean, description: "Display this usage guide"},
  {name: "version", type: Boolean, description: "Show application version"},
  {name: "action", alias: "a", type: String, description: "(Required) action to perform (encode or decode)"},
  {name: "shift", alias: "s", type: Number, description: "(Required) shift (how many letters forward, or back if it's negative)"},
  {name: "input", alias: "i", type: String, description: "Input file name. If not set, then standard input is used"},
  {name: "output", alias: "o", type: String, description: "Output file name. If not set, then standard output is used"}
]

const options = commandLineArgs(optionDefinitions)

if (options.help || Object.keys(options).length === 0) {
  help()
} else if (options.version) {
  console.log("Version: 1.0.0")
} else {
  if (validateArgs()) {
    // decoding is same as encoding with opposite sign
    const shift = options.action === "encode" ? options.shift : -options.shift 
    run(shift, options.input, options.output)
  }
}

function help() {
  const usage = commandLineUsage([
    {
      header: "Caesar cipher encoder/decoder",
      content: "Command-line utility to encode and decode text with Caesar cipher"
    },
    {
      header: "Options",
      optionList: optionDefinitions
    },
    {
      header: "Examples",
      content: `{bold ts-node caesar -a encode -s 1}
      Encode from standard input to standard output with shift 1. Press Ctrl-C to end.

      {bold ts-node caesar -a encode -s 2 -i .\\\\data\\\\original.txt -o .\\\\data\\\\encoded.txt}
      Encode text from original.txt and write it to encoded.txt

      {bold ts-node caesar -a decode -s 2 -i .\\\\data\\\\encoded.txt -o .\\\\data\\\\decoded.txt}
      Decode text from original.txt and write it to decoded.txt`
    },
    {
      header: "Notes",
      content: `1. If output file exists, it will be overwritten without notice
      2. --shift can be negative and can exceed the size of alphabet
      3. Only English alphabet characters are encoded/decoded, all other characters will be kept intact.
      4. If --help is given the help is displayed and other options are ignored.
      5. If --version is given and --help has omitted the version of the app is displayed and other options are ignored.
      6. Values for options can be set like "-a encode" (short form, whitespace separated) or "--action encode" (whitespace separated),
      or "--action=encode" (= separated). It doesn't matter.`
    }
  ])
  console.log(usage)
}

function validateArgs(): boolean {
  let argsValid = true
  const actionValues = ["encode", "decode"]
  if (!actionValues.includes(options.action)) {
    console.log("Invalid action argument. Possible values: " + actionValues.join(", "))
    argsValid = false
  }
  if (options.shift === undefined) {
    console.log("Shift is not set. Should be integer number (1, 2, 3, ...)")
    argsValid = false
  }
  return argsValid
}

async function run(shift: number, inputPath: string | undefined, outputPath: string | undefined): Promise<void> {
  const inputStream = inputPath ? fs.createReadStream(inputPath, {encoding: "utf8"}) : process.stdin
  const outputStream = outputPath ? fs.createWriteStream(outputPath, {encoding: "utf8"}) : process.stdout

  await stream.pipeline(
    inputStream,
    async function* (source) {
      source.setEncoding('utf8')
      for await (const chunk of source) {
        yield [...chunk].map(c => encodeChar(c, shift)).join("")
      }
    },
    outputStream
  )
}

const AlphabetLength = 26
const smallACode = "a".charCodeAt(0)
const bigACode = "A".charCodeAt(0)
const smallLetterRegex = /[a-z]/
const bigLetterRegex = /[A-Z]/

function encodeChar(c: string, shift: number): string {
  let result = c
  let startCode = 0
  if (smallLetterRegex.test(c)) {
    startCode = smallACode
  } else if (bigLetterRegex.test(c)) {
    startCode = bigACode
  }
  if (startCode > 0) {
    let code = c.charCodeAt(0) + shift
    while (code < startCode) {
      code += AlphabetLength
    }
    while (code >= startCode + AlphabetLength) {
      code -= AlphabetLength
    }
    result = String.fromCharCode(code)
  }
  return result
}
