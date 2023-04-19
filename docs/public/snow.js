if (true) {
  (function () {
    var requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  (function () {
    var flakes = [],
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      flakeCount = 20,
      mX = -100,
      mY = -100;
    canvas.id = 'snow';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = 99999;
    canvas.style.pointerEvents = 'none';

    function snow() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 雪花字符 ❄❉❅❆✻✼❇❈❊✥✺

      for (var i = 0; i < flakeCount; i++) {
        var flake = flakes[i],
          x = mX,
          y = mY,
          minDist = 150,
          x2 = flake.x,
          y2 = flake.y;
        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
          dx = x2 - x,
          dy = y2 - y;
        if (dist < minDist) {
          var force = minDist / (dist * dist),
            xcomp = (x - x2) / dist,
            ycomp = (y - y2) / dist,
            deltaV = force / 2;
          flake.velX -= deltaV * xcomp;
          flake.velY -= deltaV * ycomp;
        } else {
          flake.velX *= 0.98;
          if (flake.velY <= flake.speed) {
            flake.velY = flake.speed;
          }
          flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize;
        }

        ctx.fillStyle = 'rgba(255,255,255,' + flake.opacity + ')';
        flake.y += flake.velY;
        flake.x += flake.velX;
        if (flake.y >= canvas.height || flake.y <= 0) {
          reset(flake);
        }
        if (flake.x >= canvas.width || flake.x <= 0) {
          reset(flake);
        }
        ctx.beginPath();
        // ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);

        ctx.font = `${flake.size}px monospace`;

        ctx.fillText(flake.text, flake.x, flake.y);
        ctx.fill();
      }
      requestAnimationFrame(snow);
    }

    function reset(flake) {
      flake.x = Math.floor(Math.random() * canvas.width);
      flake.y = 0;
      flake.size = Math.random() * 20 + 10;
      flake.speed = Math.random() * 1 + 1.2;
      flake.velY = flake.speed;
      flake.velX = 0;
      flake.opacity = Math.random() + 0.1;
    }

    function init() {
      // 修复重复创建的问题
      if (document.getElementById('snow')) {
        return;
      }
      document.body.appendChild(canvas);
      for (var i = 0; i < flakeCount; i++) {
        var x = Math.floor(Math.random() * canvas.width),
          y = Math.floor(Math.random() * canvas.height),
          size = Math.random() * 20 + 10,
          speed = Math.random() * 1 + 1.2,
          opacity = Math.random() + 0.1;
        let snowText = '❄❉❅❆✻✼❇❈❊✥✺';
        const text = snowText.charAt(Math.floor(Math.random() * snowText.length));

        flakes.push({
          speed: speed,
          velY: speed,
          velX: 0,
          x: x,
          y: y,
          size: size,
          stepSize: (Math.random() / 30) * 1,
          step: 0,
          angle: 180,
          opacity: opacity,
          text,
        });
      }
      snow();
    }
    // document.addEventListener('mousemove', function (e) {
    //   (mX = e.clientX), (mY = e.clientY);
    // });
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    init();
  })();
}
