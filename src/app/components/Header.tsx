export default function Header() {
    return (
        <div className="grid grid-cols-2 p-8 border-solid border-b">
            <div className="text-xl">
                GPSVis
            </div>
            <div className="grid grid-cols-3 ">
                <div>
                    Search
                </div>
                <div>
                    Settings
                </div>
                <div>
                    Logout
                </div>
            </div>
        </div>
    )
}