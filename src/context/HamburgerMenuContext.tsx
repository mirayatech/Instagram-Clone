import { useContext, createContext, useState } from 'react'

const HamburgerMenuContext = createContext()

export const HamburgerMenuContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <HamburgerMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HamburgerMenuContext.Provider>
  )
}

export const MenuPopup = () => {
  return useContext(HamburgerMenuContext)
}
