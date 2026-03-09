document.addEventListener('DOMContentLoaded', () => {
    // talksData is injected by the build script

    const scheduleContainer = document.getElementById('schedule');
    const categorySearchInput = document.getElementById('category-search');
    const talkDetailsPanel = document.getElementById('talk-details');
    const detailTitle = document.getElementById('detail-title');
    const detailSpeakers = document.getElementById('detail-speakers');
    const detailCategory = document.getElementById('detail-category');
    const detailDescription = document.getElementById('detail-description');
    const closeDetailsButton = document.getElementById('close-details');

    let currentSchedule = [];

    // Function to format time
    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Function to render the schedule
    const renderSchedule = (filter = '') => {
        scheduleContainer.innerHTML = ''; // Clear previous schedule

        let currentTime = new Date();
        currentTime.setHours(10, 0, 0); // Event starts at 10:00 AM

        currentSchedule = [];
        let talkIndex = 0;

        talksData.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add(item.type === 'talk' ? 'talk-card' : 'break-card');
            card.dataset.id = item.id;

            const startTime = new Date(currentTime);
            const endTime = new Date(currentTime.getTime() + item.duration * 60 * 1000);

            let isFilteredOut = false;
            if (item.type === 'talk' && filter) {
                const lowerCaseFilter = filter.toLowerCase();
                const categoriesMatch = item.category.some(cat => cat.toLowerCase().includes(lowerCaseFilter));
                if (!categoriesMatch) {
                    isFilteredOut = true;
                    card.classList.add('filtered-out');
                }
            }
            
            let timeString;
            if (item.type === 'talk') {
                timeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;
            } else {
                timeString = `${formatTime(startTime)} - ${formatTime(endTime)}`;
            }

            card.innerHTML = `
                <span class="time">${timeString}</span>
                <h3>${item.title}</h3>
                ${item.speakers ? `<p class="speakers">${item.speakers.join(' & ')}</p>` : ''}
                ${item.category ? `<p class="category">${item.category.join(', ')}</p>` : ''}
            `;
            // Description is not shown in the card, only in details panel

            scheduleContainer.appendChild(card);

            if (item.type === 'talk' && !isFilteredOut) {
                card.addEventListener('click', () => showTalkDetails(item));
            } else if (item.type === 'break') {
                 // Breaks are not clickable for details
            }


            // Update current time for the next item
            currentTime = endTime;
            // Add transition time if it's not the last item
            if (index < talksData.length - 1) {
                currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 minute transition
            }
        });
    };

    // Function to display talk details
    const showTalkDetails = (talk) => {
        detailTitle.textContent = talk.title;
        detailSpeakers.textContent = `Speakers: ${talk.speakers ? talk.speakers.join(' & ') : 'N/A'}`;
        detailCategory.textContent = `Categories: ${talk.category ? talk.category.join(', ') : 'N/A'}`;
        detailDescription.textContent = talk.description;
        talkDetailsPanel.classList.remove('hidden');
    };

    // Event listener for search input
    categorySearchInput.addEventListener('input', (event) => {
        renderSchedule(event.target.value);
    });

    // Event listener for closing details panel
    closeDetailsButton.addEventListener('click', () => {
        talkDetailsPanel.classList.add('hidden');
    });

    // Initial render
    renderSchedule();
});
