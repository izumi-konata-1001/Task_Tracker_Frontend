import { useState } from "react";

function CreateTaskForm(){
    const [complete, setComplete] = useState(false);
    return(
        <div class="w-full px-40 flex justify-center item-center">
            <form class="w-full space-y-6">
                <div>
                    <label class="block text-lg font-medium text-black mb-1">Title:</label>
                    <input
                        class="w-full px-3 py-2 border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required />
                </div>

                <div>
                    <label class="block text-lg font-medium text-black mb-1">Description:</label>
                    <textarea 
                    class="w-full px-3 py-2 border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows="4"
                    required >
                     </textarea>
                </div>

                <div>
                    <span class="block text-lg font-medium text-black mb-2">Completed?</span>
                    <div class="flex items-center space-x-6">
                        <label class="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                            <input type="radio" 
                            name="completed"
                            value="true"
                            checked={complete === true}
                            class="accent-primary"
                            onChange={()=> setComplete(true)}
                            required/>
                            Yes
                        </label>
                        <label class="inline-flex items-center space-x-2 text-m text-black cursor-pointer hover:text-primary transition-colors">
                            <input type="radio" 
                            name="completed"
                            value="false"
                            checked={complete === false}
                            onChange={() => setComplete(false)}
                            class="accent-primary"/>
                            No
                        </label>
                    </div>
                </div>

                <div class="w-full flex items-center justify-center">
                    <button type="submit" class="w-full text-center bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary font-medium px-4 py-2 rounded transition-colors duration-300">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTaskForm;