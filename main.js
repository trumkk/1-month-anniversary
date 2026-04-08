let highestZ = 1;

class Paper {
  holding = false;
  startX = 0;
  startY = 0;
  prevX = 0;
  prevY = 0;
  currentX = 0;
  currentY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // START (chuột + touch)
    paper.addEventListener("pointerdown", (e) => {
      this.holding = true;

      paper.style.zIndex = highestZ++;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.setPointerCapture(e.pointerId);
    });

    // MOVE
    paper.addEventListener("pointermove", (e) => {
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

    // END
    paper.addEventListener("pointerup", () => {
      this.holding = false;
    });

    paper.addEventListener("pointercancel", () => {
      this.holding = false;
    });
  }
}

// init papers
document.querySelectorAll(".paper").forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});

// ================= AUDIO FIX =================
const audio = document.getElementById("bgm");

const playAudio = () => {
  audio.muted = false;
  audio.play().catch(() => {});
};

// phải là interaction thật
document.body.addEventListener("pointerdown", playAudio, { once: true });
document.body.addEventListener("touchstart", playAudio, { once: true });
document.body.addEventListener("click", playAudio, { once: true });
