const newReviewData = generateNewReview();

const newReviewElement = document.createElement("div");
newReviewElement.className  = "w-1/3 rounded shadow shadow-2xl border border-gray m-5 bg-cyan-50"

newReviewElement.innerHTML = 
    <div class="px-6 py-2">
        <div class="flex justify-between items-center">
            <h3 class="font-bold text-xl">${newReviewData.title} by ${newReviewData.user_name}</h3>
        </div>
        <p class="inline-block bg-gray-200 rounded-md px-3 py-1 mt-2 text-sm font-semibold text-gray-700 mr-2">
            "${newReviewData.text}"
        </p>
    </div>;

const userPostsContainer = document.getElementById("userPosts");
userPostsContainer.appendChild(newReviewElement);