import type { ReactNode } from "react"

interface PanelProps{
    bgColor: string,
    title: string,
    icon: ReactNode,
    value: string,
    subtitle: string
}


export default function Panel ({bgColor, title, icon, value, subtitle}: PanelProps){
    return(
        <div className={`w-[45%] h-37.5 ${bgColor} flex flex-col m-4 rounded-xl shadow-sm p-5`}>
            <div className="flex flex-row justify-between items-center">
                <p className="text-gray-400 font-semibold">
                    {title}
                </p>
                {icon}
            </div>
            <h1 className="font-bold text-2xl mt-4">{value}</h1>
            <p className="font-medium text-gray-500 mt-4">{subtitle}</p>
        </div>
    )
}