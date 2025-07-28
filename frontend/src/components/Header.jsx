import { useState } from 'react'
import {Link} from "react-router-dom"
// Import icons from the react-icons lib
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn } from 'react-icons/fi'

function Header() {
    // The default state is false when the screen resolution is small then the state is set to True which will render the isMobileMenuOpen code when clicked shows the content
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) 
    // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    
 return (
        <nav className="bg-gray-800 p-5">
            {/* Parent div for logo, search and cart which is also the deafult isMobileMenuOpen state*/}
            <div className="flex items-center justify-between"> 
                {/* First child div for logo which also acts as a parent div for search and input*/}
                <div className="flex items-center">
                    <Link to="/" className="text-white text-2xl font-bold">
                        E-Com
                    </Link>
                    <input
                        type="text"
                        placeholder="Search"
                        className="ml-4 p-2 rounded-md bg-gray-700 text-white hidden sm:block"
                        // value={keyword}
                        // onChange={e => setKeyword(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hidden sm:block ml-2"
                        // onClick={handleSearch}
                        >
                        Search
                    </button>
                </div>
                 {/* Second child div for cart */}
                <div className="hidden sm:flex items-center space-x-4">
                    <Link to="/cart" className="text-white flex items-center">
                        <FiShoppingCart className="mr-1" />
                        Cart
                        <span className='bg-blue-500 text-white rounded-full px-3 py-1 ml-2'>5</span>
                    </Link>

                    {/* {userInfo && <div className="relative group">
                        {renderProfileButton()}
                    </div>}
                    {userInfo?.isAdmin && <div className="relative group ">
                        {renderAdminButton()}
                    </div>}
                    {!userInfo && renderSignInButton()} */}
                </div>
                {/* Third child div for button visible only in mobile resolution and when clicked will render the below code and changing the state to TRUE*/}
                <div className="sm:hidden">
                    <button
                        // on click the useState changes from False to True thus showing the button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white text-xl focus:outline-none"
                    >
                        ☰
                    </button>
                </div>
            </div>
            {/* What should happen when the resolution is small(mobile) i.e isMobileMenuOpen is True render the below code */}
            {isMobileMenuOpen && (
                <div className="mt-4 sm:hidden">
                    <input
                        type="text"
                        placeholder="Search"
                        className="p-2 rounded-md bg-gray-700 text-white w-full mb-2"
                    />
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full mb-2">
                        Search
                    </button>
                    <div className="space-y-2">
                        <Link to="/cart" className="text-white flex items-center">
                            <FiShoppingCart className="mr-1" />
                            Cart
                            <span className='bg-blue-500 text-white rounded-full px-3 py-1 ml-2'>5</span>
                        </Link>
                        {/* {userInfo && <div className="relative group ">
                            {renderProfileButton()}
                        </div>}
                        {userInfo?.isAdmin && <div className="relative group ">
                            {renderAdminButton()}
                        </div>}
                        {!userInfo && renderSignInButton()} */}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header