import BackButton from "../../BackButton";

function ChangePasword(){
    return(
        <div>
            <div class="mb-4">
                <BackButton />
            </div>
            
            <div class="text-center mb-3">
                <h1 class="text-2xl font-bold">Change Password</h1>
            </div>
            <div class="w-full text-left flex">
                <form class="space-y-6 w-full">
                    <div class="w-full">
                        <div class="w-full flex justify-between">
                            <label class="text-left text-sm font-medium">Old Password: </label>
                            <label class="text-right text-sm text-shadow">Old Password message</label>
                        </div>
                        <input

                        class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>

                    <div class="w-full">
                        <div class="w-full flex justify-between">
                            <label class="text-left text-sm font-medium">New Password: </label>
                            <label class="text-right text-sm text-shadow">New Password Message</label>
                        </div>
                        <input

                        class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>

                    <div class="w-full">
                        <div class="w-full flex justify-between">
                            <label class="text-left text-sm font-medium">Confirm New Password: </label>
                        </div>
                        <input

                        class="w-full block bg-white border border-dark px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required />
                    </div>
                    <div class="w-full flex justify-center">
                        <button 
                        class="w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                            Submit
                        </button>
                    </div> 
                </form>
            </div>
            <div class="text-center">
                <p class="text-sm text-shadow">message</p>
            </div>
        </div>

    )
}

export default ChangePasword;