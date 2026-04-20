document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 60);
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));

    document.querySelectorAll('.marquee').forEach(m => {
        const content = m.querySelector('.marquee-content');
        if (!content) return;
        content.appendChild(content.cloneNode(true));
    });

    const rotator = document.getElementById('roleRotator');
    if (rotator) {
        const roles = ['full-stack', 'front-end', 'créatif', 'curieux'];
        let idx = 0;
        setInterval(() => {
            rotator.style.opacity = '0';
            rotator.style.transform = 'translateY(-6px)';
            rotator.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            setTimeout(() => {
                idx = (idx + 1) % roles.length;
                rotator.textContent = roles[idx];
                rotator.style.opacity = '1';
                rotator.style.transform = 'translateY(0)';
            }, 320);
        }, 2800);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const id = anchor.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(l => {
                        l.classList.toggle('text-white', l.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { threshold: 0.3 }
    );
    sections.forEach(s => navObserver.observe(s));
});
