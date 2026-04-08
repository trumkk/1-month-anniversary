let highestZ = 1;

class Paper {
  holding = false;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // ===== MOUSE (PC) =====
    paper.addEventListener("mousedown", (e) => {
      this.holding = true;

      paper.style.zIndex = highestZ++;

      this.prevX = e.clientX;
      this.prevY = e.clientY;
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.holding) return;

      const dx = e.clientX - this.prevX;
      const dy = e.clientY - this.prevY;

      this.currentX += dx;
      this.currentY += dy;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform = `
        translate(${this.currentX}px, ${this.currentY}px)
        rotate(${this.rotation}deg)
      `;
    });

    document.addEventListener("mouseup", () => {
      this.holding = false;
    });

    // ===== TOUCH (MOBILE) =====
    paper.addEventListener(
      "touchstart",
      (e) => {
        this.holding = true;

        paper.style.zIndex = highestZ++;

        const touch = e.touches[0];
        this.prevX = touch.clientX;
        this.prevY = touch.clientY;
      },
      { passive: false },
    );

    paper.addEventListener(
      "touchmove",
      (e) => {
        if (!this.holding) return;

        e.preventDefault(); // 🔥 cực kỳ quan trọng

        const touch = e.touches[0];

        const dx = touch.clientX - this.prevX;
        const dy = touch.clientY - this.prevY;

        this.currentX += dx;
        this.currentY += dy;

        this.prevX = touch.clientX;
        this.prevY = touch.clientY;

        paper.style.transform = `
        translate(${this.currentX}px, ${this.currentY}px)
        rotate(${this.rotation}deg)
      `;
      },
      { passive: false },
    );

    paper.addEventListener("touchend", () => {
      this.holding = false;
    });
  }
}

// init
document.querySelectorAll(".paper").forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// ===== AUDIO =====
const audio = document.getElementById("bgm");

const playAudio = () => {
  audio.muted = false;
  audio.play().catch(() => {});
};

document.body.addEventListener("touchstart", playAudio, { once: true });
document.body.addEventListener("click", playAudio, { once: true });
