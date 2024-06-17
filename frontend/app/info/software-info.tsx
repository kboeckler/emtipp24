import {getVersion} from "@/app/actions/repo";
import Link from "next/link";


export default async function SoftwareInfo() {
    const version = (await getVersion()).split("-")[0]

    return (
        <div>
            <Link href={"https://github.com/kboeckler/emtipp24"} target={"_blank"}>v{version}</Link>
        </div>
    )

}