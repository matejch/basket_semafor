var timeinterval;
var paused = false; // is the clock paused?
var time_left; // time left on the clock when paused
var id_timer = 'box_time'
var time_in_minutes = 9;

function init() {
    const team_a_3p_div = document.getElementById('team_a_3')
    const team_a_2p_div = document.getElementById('team_a_2')
    const team_a_1p_div = document.getElementById('team_a_1')
    const team_a_0p_div = document.getElementById('team_a_0') //reduce points

    const team_b_3p_div = document.getElementById('team_b_3')
    const team_b_2p_div = document.getElementById('team_b_2')
    const team_b_1p_div = document.getElementById('team_b_1')
    const team_b_0p_div = document.getElementById('team_b_0') //reduce points

    const team_a_fouls_div = document.getElementById('box_team_a_info')
    const team_b_fouls_div = document.getElementById('box_team_b_info')

    const team_a_score = document.getElementById('box_team_a_score')
    const team_b_score = document.getElementById('box_team_b_score')

    const quarter_div = document.getElementById('box_space_1')

    const btn_team_a_add_foul = document.getElementById('team_a_add_foul')
    const btn_team_a_remove_foul = document.getElementById('team_a_remove_foul')
    const btn_team_b_add_foul = document.getElementById('team_b_add_foul')
    const btn_team_b_remove_foul = document.getElementById('team_b_remove_foul')

    const btn_play = document.getElementById('play')
    const btn_gong = document.getElementById('gong')
    const btn_set_timer = document.getElementById('set_timer')
    const btn_next_quarter = document.getElementById('next_quarter')

    var clock = document.getElementById(id_timer);
    var current_time;
    var deadline;

    function set_clock(t) {
        clock.innerHTML = +t.minutes + ':' + t.seconds;
    }

    function set_timer_helper(minutes, seconds) {
        let current_time = Date.parse(new Date());
        deadline = new Date(current_time + minutes * 60 * 1000 + seconds*1000);
        let t = time_remaining(deadline);
        set_clock(t);
        paused = false;
        pause_clock();
        update_local_state();
    }

    function get_time_on_clock(){
        time_now = document.getElementById('box_time').innerText.split(':');
        let mins = parseInt(time_now[0]) || time_in_minutes;
        let secs = parseInt(time_now[1]) || 0;

        return [mins, secs]
    }

    function set_timer() {
        let time_on_clock = get_time_on_clock();
        let minutes_on_clock = time_on_clock[0];
        let seconds_on_clock = time_on_clock[1];
        let minutes = parseInt(prompt("Set number of minutes:", 9)) ?? minutes_on_clock;
        let seconds = parseInt(prompt("Set number of seconds:", 0)) ?? seconds_on_clock;
        set_timer_helper(minutes, seconds);
        update_local_state();
    }

    function set_initial_time() {
        current_time = Date.parse(new Date());
        deadline = new Date(current_time + time_in_minutes * 60 * 1000);
        var t = time_remaining(deadline);
        set_clock(t);
        pause_clock();
    }

    set_initial_time()
    //run_clock(deadline);

    function update_local_state(){
        localStorage.setItem(quarter_div.id, quarter_div.innerText)
        localStorage.setItem(team_a_fouls_div.id, team_a_fouls_div.innerText)
        localStorage.setItem(team_b_fouls_div.id, team_b_fouls_div.innerText)
        localStorage.setItem(team_a_score.id, team_a_score.innerText)
        localStorage.setItem(team_b_score.id, team_b_score.innerText)

        let time_on_clock = get_time_on_clock();
        let minutes = time_on_clock[0];
        let seconds = time_on_clock[1];
        localStorage.setItem('minutes',minutes);
        localStorage.setItem('seconds',seconds);
    }

    function play_gong() {
        console.log("Playing gong sound");
        const gong = new Audio('buzzer.mp3');
        gong.preload = 'auto';
        gong.oncanplaythrough = function() {
            gong.play().catch(error => {
                console.error("Error playing gong sound:", error);
            });
        };
        gong.onerror = function() {
            console.error("Error loading gong sound");
        };
        return false;
    }

    function next_quarter() {
        const quarters = ['Q1','Q2', 'Q3', 'Q4']

        let quarter = quarter_div.innerText
        idx = quarters.indexOf(quarter)
        if (idx==3) {
            quarter_div.innerText = 'Q1'
        }
        else {
            quarter_div.innerText = quarters[idx + 1]
        }

        team_a_fouls_div.innerText = 0
        team_b_fouls_div.innerText = 0

        bonus_helper(team_a_fouls_div)
        bonus_helper(team_b_fouls_div)

        set_initial_time()
        update_local_state()
    }

    function time_remaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        if (t<=0) {
            t = 0
        }
        var miliseconds = Math.floor( (t%1000));
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds, 'miliseconds':miliseconds};
    }

    function run_clock(endtime){
        function update_clock() {
            var t = time_remaining(endtime);
            set_clock(t)
            if(t.total<=0){ 
			console.log("KOOOONC!");
			const buzzer = new Audio('buzzer.mp3');
			buzzer.play();
			clearInterval(timeinterval); }
        }
        update_clock(); // run function once at first to avoid delay
        timeinterval = setInterval(update_clock,100);
    }

    function pause_clock(){
        if(!paused){
            paused = true;
            clearInterval(timeinterval); // stop the clock
            time_left = time_remaining(deadline).total; // preserve remaining time
        }
    }

    function resume_clock(){
        if(paused){
            paused = false;

            // update the deadline to preserve the amount of time remaining
            deadline = new Date(Date.parse(new Date()) + time_left);

            // start the clock
            run_clock(deadline);
        }
    }

    function increase_time_left() {
        if (paused) {
            time_left += 1000
            deadline = new Date(Date.parse(new Date()) + time_left);
            var t = time_remaining(deadline);
            set_clock(t)
        }
    }

    function play_pause() {
         if (paused) {
                resume_clock();
                btn_play.innerText = "pause";
            }
            else {
                btn_play.innerText = "play";
                pause_clock();
            }
        return false;
    };

    key('g', play_pause);
    
    key('q', team_a_1point);
    key('w', team_a_2point);
    key('e', team_a_3point);

    key('d', team_a_remove_foul);
    key('f', team_a_add_foul);
    key('h', team_b_add_foul);      
    key('j', team_b_remove_foul);

    key('i', team_b_1point);
    key('o', team_b_2point);
    key('p', team_b_3point);
    key('r', team_a_0point);
    key('u', team_b_0point);
    
    
    key('t', play_gong);

    function score_helper(pts, element) {
        let val = element.innerText
        let new_score = parseInt(val) + pts
        console.log(new_score)
        if (new_score < 0) {
            new_score = 0
        }
        element.innerText = new_score
        update_local_state();
    }

    function bonus_helper(element) {
        let val = element.innerText
        let fouls = parseInt(val)

        if (fouls<4) {
            element.classList.remove("red")
            element.classList.add("normal")
        } else {
            element.classList.add("red")
            element.classList.remove("normal")
        }
    }

    function foul_helper(pts, element) {
        let val = element.innerText
        let new_score = parseInt(val) + pts
        if (new_score < 0) {
            new_score = 0
        }
        if (new_score > 3) {
            new_score = 4
        }
        element.innerText = new_score
        bonus_helper(element)
        update_local_state();
    }

    function team_a_add_foul(){
        foul_helper(1, team_a_fouls_div);
        return false;
    }

    function team_b_add_foul(){
        foul_helper(1, team_b_fouls_div);
        return false;
    }

    function team_a_remove_foul(){
        foul_helper(-1, team_a_fouls_div);
        return false;
    }

    function team_b_remove_foul(){
        foul_helper(-1, team_b_fouls_div);
        return false;
    }

    function team_a_3point() {
        score_helper(3, team_a_score);
        return false;
    }
    function team_a_2point() {
        score_helper(2, team_a_score);
        return false;
    }
    function team_a_1point() {
        score_helper(1, team_a_score);
        return false;
    }
    function team_a_0point() {
        score_helper(-1, team_a_score);
        return false;
    }
    function team_b_3point() {
        score_helper(3, team_b_score);
        return false;
    }
    function team_b_2point() {
        score_helper(2, team_b_score);
        return false;
    }
    function team_b_1point() {
        score_helper(1, team_b_score);
        return false;
    }
    function team_b_0point() {
        score_helper(-1, team_b_score);
        return false;
    }

    team_a_3p_div.onclick = team_a_3point;
    team_a_2p_div.onclick = team_a_2point;
    team_a_1p_div.onclick = team_a_1point;
    team_a_0p_div.onclick = team_a_0point;
    team_b_3p_div.onclick = team_b_3point;
    team_b_2p_div.onclick = team_b_2point;
    team_b_1p_div.onclick = team_b_1point;
    team_b_0p_div.onclick = team_b_0point;

    btn_team_a_add_foul.onclick = team_a_add_foul;
    btn_team_b_add_foul.onclick = team_b_add_foul;
    btn_team_a_remove_foul.onclick = team_a_remove_foul;
    btn_team_b_remove_foul.onclick = team_b_remove_foul;

    btn_play.onclick = play_pause;
    btn_gong.onclick = play_gong;
    btn_set_timer.onclick = set_timer;
    btn_next_quarter.onclick = next_quarter;
}

function addOnload(fun){
    var last = window.onload;
    window.onload = function(){
        if(last) last();
        fun();
    }
}

addOnload(init)
console.log("loaded timers and commands")

