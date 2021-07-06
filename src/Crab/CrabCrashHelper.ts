import { existsSync } from "fs"

export default function crash(){
    if(!existsSync("./src/Crab/Crab.ts")){
        console.error("🦀 the crab is gone 🦀")
        process.exit(2)
    }
}