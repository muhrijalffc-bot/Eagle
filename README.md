<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Eagle — Milky Way</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: Arial, Helvetica, sans-serif;
            background: #02030b;
            color: white;
        }

        /* =========================
           BACKGROUND
        ========================== */

        body {
            position: relative;
            background:
                radial-gradient(
                    ellipse at 50% 50%,
                    rgba(90, 50, 160, 0.20) 0%,
                    rgba(20, 20, 70, 0.18) 30%,
                    rgba(2, 3, 11, 1) 70%
                );
        }

        /* Nebula */
        .nebula {
            position: absolute;
            width: 900px;
            height: 500px;
            top: 50%;
            left: 50%;

            transform: translate(-50%, -50%) rotate(-18deg);

            background:
                radial-gradient(
                    ellipse,
                    rgba(150, 90, 255, 0.25) 0%,
                    rgba(70, 100, 255, 0.15) 30%,
                    rgba(0, 0, 0, 0) 70%
                );

            filter: blur(45px);
            opacity: 0.9;

            animation: nebulaMove 12s ease-in-out infinite alternate;
        }

        @keyframes nebulaMove {
            from {
                transform: translate(-50%, -50%) rotate(-18deg) scale(1);
            }

            to {
                transform: translate(-50%, -50%) rotate(-10deg) scale(1.15);
            }
        }

        /* =========================
           STAR CANVAS
        ========================== */

        #stars {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
        }

        /* =========================
           MAIN CONTENT
        ========================== */

        .container {
            position: relative;
            z-index: 2;

            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            text-align: center;

            padding: 30px;
        }

        .content {
            max-width: 900px;
        }

        /* Small label */

        .label {
            display: inline-block;

            padding: 8px 18px;

            margin-bottom: 25px;

            border: 1px solid rgba(255,255,255,0.25);
            border-radius: 50px;

            background: rgba(255,255,255,0.05);

            backdrop-filter: blur(10px);

            font-size: 13px;
            letter-spacing: 4px;
            text-transform: uppercase;

            color: rgba(255,255,255,0.75);
        }

        /* Main title */

        h1 {
            font-size: clamp(70px, 13vw, 180px);

            font-weight: 700;

            letter-spacing: -8px;

            line-height: 0.9;

            background: linear-gradient(
                180deg,
                #ffffff 0%,
                #d9d4ff 40%,
                #8f7cff 100%
            );

            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;

            filter:
                drop-shadow(0 0 20px rgba(150,120,255,0.35))
                drop-shadow(0 0 60px rgba(100,80,255,0.15));

            margin-bottom: 25px;
        }

        /* Subtitle */

        .subtitle {
            font-size: clamp(20px, 3vw, 32px);

            font-weight: 300;

            letter-spacing: 12px;

            text-transform: uppercase;

            color: rgba(255,255,255,0.85);

            margin-bottom: 25px;
        }

        .description {
            max-width: 600px;

            margin: 0 auto 40px;

            color: rgba(255,255,255,0.55);

            line-height: 1.8;

            font-size: 15px;
        }

        /* =========================
           BUTTON
        ========================== */

        .buttons {
            display: flex;
            justify-content: center;
            gap: 15px;

            flex-wrap: wrap;
        }

        .btn {
            text-decoration: none;

            padding: 14px 28px;

            border-radius: 50px;

            font-size: 14px;

            transition:
                transform 0.3s ease,
                box-shadow 0.3s ease,
                background 0.3s ease;
        }

        .btn-primary {
            color: white;

            background:
                linear-gradient(
                    135deg,
                    #705cff,
                    #a879ff
                );

            box-shadow:
                0 0 25px rgba(120,90,255,0.35);
        }

        .btn-secondary {
            color: rgba(255,255,255,0.8);

            border: 1px solid rgba(255,255,255,0.2);

            background: rgba(255,255,255,0.05);

            backdrop-filter: blur(10px);
        }

        .btn:hover {
            transform: translateY(-4px);

            box-shadow:
                0 10px 35px rgba(120,90,255,0.35);
        }

        /* =========================
           DECORATIVE ORBIT
        ========================== */

        .orbit {
            position: absolute;

            width: 600px;
            height: 600px;

            border: 1px solid rgba(255,255,255,0.05);

            border-radius: 50%;

            z-index: 1;

            animation: rotate 30s linear infinite;
        }

        .orbit::before {
            content: "";

            position: absolute;

            width: 8px;
            height: 8px;

            background: white;

            border-radius: 50%;

            top: 20px;
            left: 50%;

            box-shadow:
                0 0 10px white,
                0 0 30px #8b6cff;
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }

        /* =========================
           BOTTOM INFO
        ========================== */

        .bottom {
            position: absolute;

            bottom: 25px;
            left: 0;

            width: 100%;

            text-align: center;

            color: rgba(255,255,255,0.3);

            font-size: 11px;

            letter-spacing: 3px;

            text-transform: uppercase;

            z-index: 3;
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 600px) {

            h1 {
                letter-spacing: -4px;
            }

            .subtitle {
                letter-spacing: 6px;
            }

            .description {
                font-size: 14px;
            }

            .orbit {
                width: 350px;
                height: 350px;
            }
        }
    </style>
</head>

<body>

    <!-- Animated stars -->
    <canvas id="stars"></canvas>

    <!-- Milky Way nebula -->
    <div class="nebula"></div>

    <!-- Decorative orbit -->
    <div class="orbit"></div>

    <!-- Main content -->
    <main class="container">

        <section class="content">

            <div class="label">
                Welcome to
            </div>

            <h1>UNIVERSE</h1>

            <div class="subtitle">
                HALO
            </div>

            <p class="description">
                Explore the silence between the stars.
                A digital space inspired by the beauty,
                mystery, and infinite depth of the Milky Way.
            </p>

            <div class="buttons">

                <a href="saving.html" class="btn btn-primary">
                    Saving
                </a>
                <a href="kasku.html" class="btn btn-secondary">
                    Arus Kas
                </a>
                <a href="todolist.html" class="btn btn-primary">
                    To Do List

            </div>

        </section>

    </main>

    <div class="bottom">
        Beyond the stars · Eagle
    </div>


    <script>

        /* ==================================
           STAR FIELD
        ================================== */

        const canvas = document.getElementById("stars");
        const ctx = canvas.getContext("2d");

        let stars = [];

        function resizeCanvas() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            createStars();
        }

        function createStars() {

            stars = [];

            const numberOfStars =
                Math.floor(
                    (canvas.width * canvas.height) / 7000
                );

            for (let i = 0; i < numberOfStars; i++) {

                stars.push({

                    x: Math.random() * canvas.width,

                    y: Math.random() * canvas.height,

                    radius:
                        Math.random() * 1.5 + 0.2,

                    speed:
                        Math.random() * 0.25 + 0.05,

                    opacity:
                        Math.random() * 0.8 + 0.2,

                    twinkle:
                        Math.random() * 0.02 + 0.005

                });

            }
        }

        function animateStars() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            stars.forEach(star => {

                star.y -= star.speed;

                if (star.y < 0) {

                    star.y = canvas.height;

                    star.x =
                        Math.random() * canvas.width;
                }

                star.opacity +=
                    star.twinkle;

                if (
                    star.opacity >= 1 ||
                    star.opacity <= 0.2
                ) {

                    star.twinkle *= -1;
                }

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(255,255,255,${star.opacity})`;

                ctx.fill();

            });

            requestAnimationFrame(animateStars);
        }

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        resizeCanvas();

        animateStars();

    </script>

</body>
</html>
