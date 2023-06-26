const galleryContainer = document.getElementById('app');

function createImageContainer() {
	const imgCont = document.createElement('div');
	imgCont.classList = 'img-container';
	return imgCont;
}

function lazyLoadImage(imgCont) {
	const randomSize = Math.floor(Math.random() * 200) + 600;
	const image = document.createElement('img');
	image.src = `https://picsum.photos/${randomSize}`;

	imgCont.appendChild(image);
	imgCont.classList.add('slide-in');
}

async function displayImages() {
	try {
		const rows = 200;

		for (let i = 0; i < rows; i++) {
			const imgCont = createImageContainer();
			imgCont.style.gridColumn = `span ${Math.floor(Math.random() * 4) + 1}`;
			imgCont.style.gridRow = `span ${Math.floor(Math.random() * 7) + 1}`;

			galleryContainer.appendChild(imgCont);

			const options = {
				threshold: 0.7,
			};

			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						lazyLoadImage(entry.target);
						observer.unobserve(entry.target);
					}
				});
			}, options);

			observer.observe(imgCont);
		}
	} catch (error) {
		console.error('Error displaying images:', error);
	}
}

displayImages();
