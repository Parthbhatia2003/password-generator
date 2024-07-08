import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [Password, setPassword] = useState("")

  // useref hook

  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (characterAllowed) str += "!@#$%^&*(){}[]`-_+~";

    for (let i = 0; i < length; i++) {

      let char = Math.floor((Math.random() * str.length))
      // console.log(char);
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, characterAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // // console.log(passwordRef.current?.select());
    
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(Password)
    // console.log(window.navigator.clipboard);
    
  }, [Password])

  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllowed, characterAllowed])


  return (
    <>
      <div className='w-full text-center max-w-md mx-auto shadow-md
   rounded-lg px-2 py-3 my-9 text-orange-500 bg-gray-700'>

        <h1 className='text-white text-center my-3 '>Password generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef} />
          <button
            onClick={copyPasswordToClipboard}
            className='outlione-none bg-blue-700
        text-white px-3 py-0.5 shrink-0'
          >COPY</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setcharacterAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
