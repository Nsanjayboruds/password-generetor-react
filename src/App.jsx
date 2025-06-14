import { useState, useCallback, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+-=[]{}|;:\'",.<>/?'

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
    setCopied(false)
  }, [length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])

  const handleCopy = () => {
    window.navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-2xl p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400">
          🔐 Password Generator
        </h1>

        <div className="flex items-center gap-2 shadow-md rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full py-2 px-4 text-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-4 py-2 font-medium"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="font-medium">
              Length: <span className="font-bold">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min="6"
              max="100"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
                className="accent-blue-600"
              />
              <span>Include Numbers</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-blue-600"
              />
              <span>Include Symbols</span>
            </label>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Made with 💙 using React & TailwindCSS
        </div>
      </div>
    </div>
  )
}

export default App
