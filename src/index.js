document.addEventListener('DOMContentLoaded', () => {
  const ramenMenu = document.getElementById('ramen-menu');
  const ramenDetail = document.getElementById('ramen-detail');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');
  const newRamenForm = document.getElementById('new-ramen');

  // تحميل جميع الرامن عند تحميل الصفحة
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.classList.add('ramen-image');
        img.addEventListener('click', () => {
          // عرض تفاصيل الرامن عند النقر على الصورة
          document.querySelector('.detail-image').src = ramen.image;
          document.querySelector('.name').textContent = ramen.name;
          document.querySelector('.restaurant').textContent = ramen.restaurant;
          ratingDisplay.textContent = ramen.rating;
          commentDisplay.textContent = ramen.comment;
        });
        ramenMenu.appendChild(img);
      });

      // عرض تفاصيل أول رامن عند تحميل الصفحة
      if (ramens.length > 0) {
        const firstRamen = ramens[0];
        document.querySelector('.detail-image').src = firstRamen.image;
        document.querySelector('.name').textContent = firstRamen.name;
        document.querySelector('.restaurant').textContent = firstRamen.restaurant;
        ratingDisplay.textContent = firstRamen.rating;
        commentDisplay.textContent = firstRamen.comment;
      }
    });

  // إضافة رامن جديد عند تقديم النموذج
  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newRamen = {
      name: event.target['name'].value,
      restaurant: event.target['restaurant'].value,
      image: event.target['image'].value,
      rating: event.target['rating'].value,
      comment: event.target['new-comment'].value
    };

    // عرض الرامن الجديد في القائمة
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.classList.add('ramen-image');
    img.addEventListener('click', () => {
      // عرض تفاصيل الرامن الجديد عند النقر على الصورة
      document.querySelector('.detail-image').src = newRamen.image;
      document.querySelector('.name').textContent = newRamen.name;
      document.querySelector('.restaurant').textContent = newRamen.restaurant;
      ratingDisplay.textContent = newRamen.rating;
      commentDisplay.textContent = newRamen.comment;
    });
    ramenMenu.appendChild(img);

    // إعادة تعيين النموذج
    newRamenForm.reset();
  });
});
