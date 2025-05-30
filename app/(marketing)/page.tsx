import { Footer } from "./_components/Footer"
import { Heading } from "./_components/Heading"
import { Hero } from "./_components/Hero"


const MarketingPage = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center md:justify-start text-center gap-y-8 px-6 pb-10">
                <Heading />
                <Hero/>
            </div>
            <Footer/>
        </div>
    )
}

export default MarketingPage