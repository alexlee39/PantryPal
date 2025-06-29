import Link from "next/link";

export default function Footer(){
    return (
        <footer className="bg-gray-50 border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PantryPal</h3>
              <p className="text-gray-600">Your personal cooking companion for every meal and occasion.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/favorites" className="text-gray-600 hover:text-gray-900">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>© {new Date().getFullYear()} PantryPal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}