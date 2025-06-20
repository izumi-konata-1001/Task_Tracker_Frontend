import { useState } from "react";

function AccountInformaton(){
    return(
        <div class="w-full">
            <div class="text-center mb-3">
                <h1 class="text-2xl font-bold">My Account</h1>
            </div>
            <div class="w-full space-y-4 text-base text-black flex flex-col px-20">
                <div class="flex justify-between items-center pb-1 ">
                    <label class="font-medium pr-5">User ID:</label>
                    <label class="text-shadoe">12345</label>
                </div>
                <div class="flex justify-between  items-center pb-1">
                    <label class="font-medium pr-2">Email:</label>
                    <label class="text-shadoe">12345@example.com</label>
                </div>

                <div class="flex justify-between  items-center pb-1">
                    <label class="font-medium pr-2">Username: </label>
                    <label class="text-shadoe">Alice</label>
                </div>
            </div>
            <div class="flex justify-center w-full mt-3">
                <button
                class="w-full bg-primary text-white  border-primary border-2 hover:bg-white hover:text-primary  font-semibold px-6 py-2 rounded-md transition-colors duration-300">
                    Change Password
                </button>
            </div>
        </div>
    )
}

export default AccountInformaton;