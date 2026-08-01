
const clock = document.getElementById('clock');

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}
updateClock();
setInterval(updateClock, 30000);

const dialog = document.getElementById('lightbox');
const image = document.getElementById('lightbox-image');
const title = document.getElementById('lightbox-title');

document.querySelectorAll('.gallery button').forEach((button) => {
  button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    title.textContent = button.dataset.caption;
    dialog.showModal();
  });
});

document.getElementById('close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

async function resolveLatestInstaller(event) {
  event.preventDefault();

  const button = event.currentTarget;
  const originalText = button.textContent;
  button.textContent = 'Locating latest installer...';
  button.setAttribute('aria-disabled', 'true');

  try {
    const response = await fetch(
      'https://api.github.com/repos/File-Maker/FileAtlas/releases/latest',
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

    const release = await response.json();
    const installers = release.assets.filter((asset) => {
      const name = asset.name.toLowerCase();
      return (
        (name.endsWith('.exe') || name.endsWith('.msi')) &&
        !name.includes('benchmark') &&
        !name.includes('checksum') &&
        !name.includes('sha256') &&
        !name.includes('signature')
      );
    });

    const installer =
      installers.find((asset) => /fileatlas.*(setup|installer)/i.test(asset.name)) ||
      installers.find((asset) => /(setup|installer)/i.test(asset.name)) ||
      installers[0];

    window.location.href = installer ? installer.browser_download_url : release.html_url;
  } catch (error) {
    console.error('Unable to resolve the latest FileAtlas installer:', error);
    window.location.href = 'https://github.com/File-Maker/FileAtlas/releases/latest';
  } finally {
    button.textContent = originalText;
    button.removeAttribute('aria-disabled');
  }
}

document.querySelectorAll('[data-download-latest]').forEach((button) => {
  button.addEventListener('click', resolveLatestInstaller);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));




const canvas = document.getElementById('sceneCanvas');

if (canvas) {
  const ctx = canvas.getContext('2d');
  const W = 980;
  const H = 376;
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  const controls = {
    entropy: document.getElementById('entropyDelta'),
    velocity: document.getElementById('writeVelocity'),
    mutation: document.getElementById('mutationDensity'),
    renameDelete: document.getElementById('renameDelete'),
    dependency: document.getElementById('dependencyDrift'),
    spread: document.getElementById('spread'),
    trust: document.getElementById('trustInverse'),
    filetype: document.getElementById('filetypeDrift'),
    recovery: document.getElementById('recoveryPressure')
  };

  const outputs = {
    entropy: document.getElementById('entropyDeltaOut'),
    velocity: document.getElementById('writeVelocityOut'),
    mutation: document.getElementById('mutationDensityOut'),
    renameDelete: document.getElementById('renameDeleteOut'),
    dependency: document.getElementById('dependencyDriftOut'),
    spread: document.getElementById('spreadOut'),
    trust: document.getElementById('trustInverseOut'),
    filetype: document.getElementById('filetypeDriftOut'),
    recovery: document.getElementById('recoveryPressureOut')
  };

  const riskValue = document.getElementById('riskValue');
  const confidenceValue = document.getElementById('confidenceValue');
  const classValue = document.getElementById('classValue');
  const sceneStatus = document.getElementById('sceneStatus');

  const resetButton = document.getElementById('resetScene');
  const benignButton = document.getElementById('presetBenign');
  const ransomButton = document.getElementById('presetRansom');

  let pointer = { x: 0, y: 0, active: false };
  let pulse = null;

  const names = [
    'entropy delta',
    'write velocity',
    'mutation density',
    'rename/delete pressure',
    'dependency drift',
    'cross-directory spread',
    'process trust inverse',
    'filetype drift',
    'recovery suppression'
  ];

  function read() {
    return Object.fromEntries(
      Object.entries(controls).map(([key, el]) => [key, Number(el.value) / 100])
    );
  }

  function evaluate() {
    const v = read();

    const risk = Math.max(0, Math.min(0.995,
      0.15*v.entropy + 0.13*v.velocity + 0.12*v.mutation +
      0.10*v.renameDelete + 0.09*v.dependency + 0.10*v.spread +
      0.08*v.trust + 0.07*v.filetype + 0.06*v.recovery +
      0.10*Math.min(v.entropy,v.velocity) +
      0.12*Math.min(v.mutation,v.spread) +
      0.14*Math.min(v.recovery,Math.max(v.renameDelete,v.trust))
    ));

    const confidence = Math.max(0.5, Math.min(0.99,
      0.58 + 0.20*Math.abs(risk-.5)*2 + 0.10*Math.max(v.spread,v.recovery) +
      0.08*Math.max(v.entropy,v.mutation)
    ));

    let classification = 'benign';
    if (risk >= .76) classification = 'destructive';
    else if (risk >= .46) classification = 'suspicious';

    return { ...v, risk, confidence, classification };
  }

  function syncOutputs() {
    Object.entries(controls).forEach(([key, el]) => {
      outputs[key].textContent = el.value;
    });
  }

  function press(button) {
    button.classList.add('is-pressed');
    setTimeout(() => button.classList.remove('is-pressed'), 160);
  }

  function setPreset(values, button) {
    Object.entries(values).forEach(([key, value]) => controls[key].value = value);
    syncOutputs();
    press(button);
  }

  function line(a, b, strength, destructive=false) {
    const glow = destructive ? '34,142,48' : '80,128,92';

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(a.x + 60, a.y, b.x - 60, b.y, b.x, b.y);
    ctx.setLineDash(strength > .68 ? [4,3] : []);
    ctx.strokeStyle = `rgba(${glow},${.05 + strength*.22})`;
    ctx.lineWidth = 2.4 + strength*2.4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.bezierCurveTo(a.x + 60, a.y, b.x - 60, b.y, b.x, b.y);
    ctx.strokeStyle = destructive
      ? `rgba(0,125,24,${.18 + strength*.72})`
      : `rgba(55,104,67,${.10 + strength*.40})`;
    ctx.lineWidth = .65 + strength*1.55;
    ctx.stroke();

    ctx.setLineDash([]);
  }

  function squareNode(x, y, value, label, selected=false) {
    const w = 46, h = 28;
    const left = x - w/2;
    const top = y - h/2;

    ctx.fillStyle = selected ? '#fff36a' : '#d5d5d5';
    ctx.fillRect(left, top, w, h);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left, top+h);
    ctx.lineTo(left, top);
    ctx.lineTo(left+w, top);
    ctx.stroke();

    ctx.strokeStyle = '#555555';
    ctx.beginPath();
    ctx.moveTo(left+w, top);
    ctx.lineTo(left+w, top+h);
    ctx.lineTo(left, top+h);
    ctx.stroke();

    ctx.fillStyle = '#111';
    ctx.font = 'bold 11px "Courier New"';
    ctx.textAlign = 'center';
    ctx.fillText(String(Math.round(value*255)), x, y+4);

    if (label) {
      ctx.textAlign = 'right';
      ctx.font = '10px "Courier New"';
      ctx.fillText(label, x-30, y+3);
    }
  }

  function circleNode(x, y, value, label) {
    const r = 13;

    const g = ctx.createRadialGradient(x-4, y-5, 1, x, y, r);
    g.addColorStop(0, '#dff4ff');
    g.addColorStop(.32, '#7fc3ee');
    g.addColorStop(1, '#3d87bd');

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.fillStyle = g;
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(x-1, y-1, r-1, Math.PI*.9, Math.PI*1.8);
    ctx.stroke();

    ctx.strokeStyle = '#16394e';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.stroke();

    ctx.fillStyle = '#102b3d';
    ctx.textAlign = 'center';
    ctx.font = '9px "Courier New"';
    ctx.fillText(value.toFixed(2), x, y+3);

    if (label) {
      ctx.textAlign = 'left';
      ctx.font = '10px "Courier New"';
      ctx.fillText(label, x+18, y+3);
    }
  }

  function outputBox(x, y, label, score, color) {
    const w = 92, h = 36;
    const top = y-h/2;

    ctx.fillStyle = color;
    ctx.fillRect(x, top, w, h);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, top+h);
    ctx.lineTo(x, top);
    ctx.lineTo(x+w, top);
    ctx.stroke();

    ctx.strokeStyle = '#555555';
    ctx.beginPath();
    ctx.moveTo(x+w, top);
    ctx.lineTo(x+w, top+h);
    ctx.lineTo(x, top+h);
    ctx.stroke();

    ctx.fillStyle = '#111';
    ctx.textAlign = 'left';
    ctx.font = '10px "Courier New"';
    ctx.fillText(label, x+7, y-3);
    ctx.fillText(score.toFixed(3), x+7, y+11);
  }

  function render(time) {
    const s = evaluate();

    ctx.fillStyle = '#f3f3f3';
    ctx.fillRect(0,0,W,H);

    // subtle Win95 inset frame
    ctx.strokeStyle = '#808080';
    ctx.strokeRect(.5,.5,W-1,H-1);

    const inputKeys = ['entropy','velocity','mutation','renameDelete','dependency','spread','trust','filetype','recovery'];
    const inputs = inputKeys.map((key,i)=>({
      x:145, y:34+i*38, value:s[key], label:names[i]
    }));
    const hidden1 = Array.from({length:12},(_,i)=>({x:430,y:20+i*30.5,value:.45+.35*Math.sin(time/900+i)}));
    const hidden2 = Array.from({length:8},(_,i)=>({x:650,y:34+i*44,value:.5+.32*Math.sin(time/800+i*.7)}));

    const benignScore = Math.max(0,1-s.risk);
    const suspiciousScore = Math.max(0,1-Math.abs(s.risk-.57)*1.75);
    const destructiveScore = s.risk;

    const outputsN = [
      {x:840,y:92,label:'benign',score:benignScore,color:'#d8d8d8'},
      {x:840,y:188,label:'suspicious',score:suspiciousScore,color:'#d8d8d8'},
      {x:840,y:284,label:'destructive',score:destructiveScore,color:'#95ff8c'}
    ];

    inputs.forEach((a,i)=>hidden1.forEach((b,j)=>{
      const strength = Math.max(.05, Math.min(1, a.value * (.45 + ((i*7+j*3)%9)/10)));
      line(a,b,strength,false);
    }));

    hidden1.forEach((a,i)=>hidden2.forEach((b,j)=>{
      const strength = .12 + .65*Math.abs(Math.sin(i*.9+j*.55+s.risk));
      line(a,b,strength,false);
    }));

    hidden2.forEach((a,i)=>outputsN.forEach((b,j)=>{
      const strength = Math.max(.05, Math.min(1,b.score * (.55 + ((i+j*3)%5)/8)));
      line(a,{x:b.x,y:b.y},strength,j===2);
    }));

    inputs.forEach((n,i)=>squareNode(n.x,n.y,n.value,n.label,i===8 && s.recovery>.65));
    hidden1.forEach((n,i)=>circleNode(n.x,n.y,Math.max(0,Math.min(1,n.value)),`P${i}`));
    hidden2.forEach((n,i)=>circleNode(n.x,n.y,Math.max(0,Math.min(1,n.value)),`H${i}`));

    outputsN.forEach(n=>outputBox(n.x,n.y,n.label,n.score,n.color));

    ctx.fillStyle = '#b00000';
    ctx.textAlign = 'center';
    ctx.font = 'bold 11px "Courier New"';
    ctx.fillText(
      `predicted=${s.classification}  confidence=${s.confidence.toFixed(3)}  risk=${s.risk.toFixed(3)}`,
      W/2,18
    );

    if (pointer.active) {
      ctx.beginPath();
      ctx.arc(pointer.x,pointer.y,17+2*Math.sin(time/150),0,Math.PI*2);
      ctx.strokeStyle='#000080';
      ctx.lineWidth=1;
      ctx.stroke();
    }

    if (pulse) {
      ctx.beginPath();
      ctx.arc(pulse.x,pulse.y,pulse.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,0,128,${pulse.a})`;
      ctx.lineWidth=2;
      ctx.stroke();
      pulse.r+=2.5;
      pulse.a*=.95;
      if(pulse.a<.03) pulse=null;
    }

    riskValue.textContent=s.risk.toFixed(2);
    confidenceValue.textContent=s.confidence.toFixed(2);
    classValue.textContent=s.classification;
    sceneStatus.textContent =
      s.classification === 'destructive'
        ? 'State: containment threshold exceeded'
        : s.classification === 'suspicious'
          ? 'State: review threshold exceeded'
          : 'State: benign operating range';

    requestAnimationFrame(render);
  }

  Object.values(controls).forEach(input=>{
    input.addEventListener('input',()=>{
      syncOutputs();
      sceneStatus.textContent='Scene inputs changed';
    });
  });

  benignButton.addEventListener('click',()=>{
    setPreset({
      entropy:12,velocity:18,mutation:16,renameDelete:8,dependency:10,
      spread:8,trust:12,filetype:6,recovery:2
    },benignButton);
  });

  ransomButton.addEventListener('click',()=>{
    setPreset({
      entropy:92,velocity:90,mutation:88,renameDelete:82,dependency:76,
      spread:84,trust:79,filetype:68,recovery:96
    },ransomButton);
  });

  resetButton.addEventListener('click',()=>{
    setPreset({
      entropy:18,velocity:24,mutation:20,renameDelete:14,dependency:12,
      spread:10,trust:16,filetype:8,recovery:4
    },resetButton);
  });

  canvas.addEventListener('pointermove',event=>{
    const rect=canvas.getBoundingClientRect();
    pointer.x=((event.clientX-rect.left)/rect.width)*W;
    pointer.y=((event.clientY-rect.top)/rect.height)*H;
    pointer.active=true;
  });
  canvas.addEventListener('pointerleave',()=>pointer.active=false);
  canvas.addEventListener('click',()=>{
    pulse={x:pointer.x,y:pointer.y,r:8,a:1};
    sceneStatus.textContent='Probe injected into scene';
  });

  syncOutputs();
  requestAnimationFrame(render);
}
