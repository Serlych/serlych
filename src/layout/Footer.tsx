const date = new Date();
const year = date.getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-relative z-1 backdrop-blur-sm bg-white bg-opacity-15 p-5 border border-violet-100 border-opacity-30 rounded-t-lg flex justify-between items-end">
      <div className="flex gap-10">
        <div>
          <h3 className="font-bold mb-5">Sitemap</h3>
          <ul className="list-disc list-inside">
            <li><a>Home</a></li>
            <li><a>Contact</a></li>
            <li><a>Blog</a></li>
          </ul>
        </div>
        <div>
        <h3 className="font-bold mb-5">Additional information</h3>
          <ul className="list-disc list-inside">
            <li>Located in Guadalajara, México</li>
            <li>Valid passport</li>
            <li>Open to work-related travel</li>
            <li>Open to relocation</li>
          </ul>
        </div>
      </div>
      <h3>Isaac Chavoya, {year}.</h3>
      
    </footer>
  )
}
