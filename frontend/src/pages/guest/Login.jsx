import Header from "../../components/Header";

function Login(){
    return(
        <div class="w-full h-full flex flex-col">
            <Header />
            <div class="w-full flex-1 flex justify-center items-center">
                <div class="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
                    <div class="text-center mb-3">
                        <h1 class="text-2xl font-bold">Login</h1>
                    </div>
                    <div class="w-full text-left flex">
                        <form class="space-y-6 w-full">
                            <div class="w-full">
                                <div class="w-full flex justify-between">
                                    <label class="text-left text-sm font-medium">Email: </label>
                                    <label class="text-right text-sm text-shadow">email message</label>
                                </div>
                                <input

                                class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>

                            <div class="w-full">
                                <div class="w-full flex justify-between">
                                    <label class="text-left text-sm font-medium">Password: </label>
                                    <label class="text-right text-sm text-shadow">password message</label>
                                </div>
                                <input

                                class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    required />
                            </div>
                            <div class="w-full flex justify-center">
                                <button 
                                class="w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                                    Login
                                </button>
                            </div> 
                        </form>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-shadow">message</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login;