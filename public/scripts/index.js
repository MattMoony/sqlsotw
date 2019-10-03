window.onload = () => {
    let title = document.getElementById('task-title'),
        desc = document.getElementById('task-description'),
        solution = '',
        lang = (new URL(window.location.href)).searchParams.get('lang') || 'en',
        form_in = document.getElementById('form-in'),
        ans_in = document.getElementById('ans-in'),
        sub_in = document.getElementById('sub-in'),
        reso_out = document.getElementById('reso-out'),
        reso_bug = document.getElementById('reso-bug'),
        reso_next = document.getElementById('reso-next');

    function get_new_task() {
        fetch(`/api/get-ids?lang=${lang}`).then(res => {
            if (res.status !== 200)
                return null;
            else
                return res.json();
        }).then(res => {
            if (res === null) {
                return;
            } else {
                fetch(`/api/get-task/${res[Math.floor(Math.random()*res.length)]}`).then(res => {
                    if (res.status !== 200)
                        return null;
                    else
                        return res.json();
                }).then(res => {
                    if (res === null) {
                        return;
                    } else {
                        title.innerHTML = res.title;
                        desc.innerHTML = res.description;
                        solution = res.solution;
                    }
                });
            }
        });
    }
    get_new_task();

    form_in.onsubmit = e => {
        e.preventDefault();
        
    };

    sub_in.onclick = () => {
        sub_in.blur();
    };

    function report_bug() {
        reso_bug.blur();
        console.log('Hello World!');
    }

    reso_bug.onclick = () => {
        report_bug();
    };

    reso_bug.onkeydown = e => {
        if (e.keyCode === 32 || e.keyCode === 13)
            report_bug();
    };

    function next_task() {
        reso_next.blur();
    }

    reso_next.onclick = () => {
        next_task();
    };

    reso_next.onkeydown = e => {
        if (e.keyCode === 32 || e.keyCode === 13)
            next_task();
    };
};