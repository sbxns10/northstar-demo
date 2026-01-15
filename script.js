// The text that the "AI" will type into the document
const generatedContent = `
1. EXECUTIVE SUMMARY
Northstar Enterprises is pleased to present this proposal for the deployment of the Falcon Suite to Acme Corp. Based on our recent discussions and the requirements outlined in your RFP, we have tailored a solution that ensures scalability, security, and seamless integration with your existing infrastructure.

2. COMMERCIAL TERMS (Grounded in Salesforce)
Based on your current 'Enterprise' tier eligibility, we have applied volume pricing for 500 seats.

   •  Product: Falcon Suite Enterprise
   •  Quantity: 500 User Licenses
   •  List Price: $300 / user / year
   •  Applied Discount: 15% (Volume Incentive)
   •  Total Annual Investment: $127,500

3. IMPLEMENTATION PLAN
Our dedicated Customer Success team will manage the rollout over a 6-week period:
   - Week 1-2: Technical Discovery & SSO Configuration
   - Week 3-4: Pilot Group Deployment (50 Users)
   - Week 5-6: Full Rollout & Administrator Training

4. NEXT STEPS & APPROVAL
To proceed, please sign below. Note: Due to the 15% discount applied, this proposal requires internal Finance approval before final signature.
`;

let currentStep = 0; // 0 = Ready to Draft, 1 = Ready to Review, 2 = Done

function handleAction() {
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const btnLoader = document.getElementById('btn-loader');
    const button = document.getElementById('action-btn');

    if (currentStep === 0) {
        // --- STATE 1: DRAFTING ---
        
        // 1. UI: User Message
        addUserMessage("Yes, go ahead and draft it.");

        // 2. UI: Set Button to Loading
        button.disabled = true;
        btnLoader.classList.remove('hidden');

        // 3. Logic: Simulate AI Thinking (1.5s)
        setTimeout(() => {
            addAiMessage("Certainly. I'm retrieving the latest pricing from Salesforce and drafting the content...");
            
            // 4. Logic: Start Typing Effect (1s later)
            setTimeout(() => {
                const docContainer = document.getElementById('doc-content');
                docContainer.innerHTML = ""; // Clear placeholder
                docContainer.className = "text-gray-900 font-serif text-lg leading-relaxed whitespace-pre-wrap"; // Style for real text
                
                // Start typing function
                typeWriter(generatedContent, docContainer, 5, () => {
                    // ON COMPLETE:
                    btnLoader.classList.add('hidden');
                    button.disabled = false;
                    btnText.innerText = "Send for Approval";
                    btnIcon.innerText = "🚀";
                    button.classList.replace("bg-[#0078D4]", "bg-green-600");
                    button.classList.replace("hover:bg-[#006cbd]", "hover:bg-green-700");
                    
                    addAiMessage("Draft complete. I noticed the **15% discount** exceeds the standard threshold. This requires manager approval. Shall I route this to Sarah in Finance?");
                    currentStep = 1;
                });
            }, 1000);
        }, 1500);

    } else if (currentStep === 1) {
        // --- STATE 2: SENDING FOR REVIEW ---

        // 1. UI: User Message
        addUserMessage("Yes, send it to Sarah.");

        // 2. UI: Loading
        button.disabled = true;
        btnLoader.classList.remove('hidden');

        // 3. Logic: Simulate Sending (1.5s)
        setTimeout(() => {
            btnLoader.classList.add('hidden');
            btnText.innerText = "Workflow Completed";
            btnIcon.innerText = "✓";
            button.classList.replace("bg-green-600", "bg-gray-400");
            button.classList.replace("hover:bg-green-700", "hover:bg-gray-400");
            button.classList.add("cursor-not-allowed");

            // Add the Final "Teams Card" to Chat
            const teamsCardHTML = `
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mt-2">
                    <div class="bg-[#6264A7] px-3 py-2 flex items-center gap-2">
                        <div class="w-4 h-4 bg-white rounded flex items-center justify-center text-[#6264A7] text-[10px] font-bold">T</div>
                        <span class="text-white text-xs font-bold uppercase tracking-wider">Teams Request Sent</span>
                    </div>
                    <div class="p-3">
                        <div class="text-sm font-bold text-gray-800">Approval Request: Acme Corp</div>
                        <div class="text-xs text-gray-500 mt-1">To: <span class="text-blue-600 bg-blue-50 px-1 rounded">@Sarah Manager</span></div>
                        <div class="mt-2 flex items-center gap-2">
                            <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                            <span class="text-xs text-gray-600 font-medium">Status: Pending</span>
                        </div>
                    </div>
                </div>
            `;
            
            addAiMessage("Done. I've initiated the approval workflow in Teams. You'll be notified once Sarah responds.", teamsCardHTML);
            currentStep = 2;
        }, 1500);
    }
}

// --- HELPER FUNCTIONS ---

function addUserMessage(text) {
    const chatHistory = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = "flex justify-end animate-fade-in";
    msgDiv.innerHTML = `
        <div class="bg-[#E1DFDD] text-gray-800 p-3 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-sm">
            ${text}
        </div>
    `;
    chatHistory.appendChild(msgDiv);
    scrollToBottom();
}

function addAiMessage(text, extraHTML = "") {
    const chatHistory = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = "flex gap-3 animate-fade-in";
    msgDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm">AI</div>
        <div class="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100 text-sm text-gray-700 shadow-sm leading-relaxed max-w-[90%]">
            <p>${text}</p>
            ${extraHTML}
        </div>
    `;
    chatHistory.appendChild(msgDiv);
    scrollToBottom();
}

function scrollToBottom() {
    const chatHistory = document.getElementById('chat-history');
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function typeWriter(text, element, speed, callback) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            // Auto scroll document parent
            element.parentElement.parentElement.scrollTop = element.parentElement.parentElement.scrollHeight;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}