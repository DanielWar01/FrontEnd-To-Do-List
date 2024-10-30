import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
    children: React.ReactNode;
};

const DashBoardLayout = async (props: Props) => {
    const session = await getServerSession(authOptions);
    return (
        <div className=" flex ">
            <div className="pt-5 w-64 text-xl font-bold border-r shadow h-screen p-2">
                <Link
                    className="p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition "
                    href={`/dashboard/user/${session?.user.id}`}
                >
                    Perfil de usuario
                </Link>
            </div>
            <main className="w-full">{props.children}</main>
        </div>
    );
};

export default DashBoardLayout;