const attackFilter = (item) => {
  return item.hasAttack && (item.type === "weapon" || item.type === "attack");
};

let actors = [];

if (!actors.length) actors = canvas.tokens.controlled.map(t => t.actor).filter(a => !!a);

for (const actor of actors){

  const attacks = collect_attacks(actor);
  const [main_attack, secondary_attacks] = divide_attacks(attacks);

  if (!main_attack) continue;

  main_attack.use({skipDialog: true});

  for (const attack of secondary_attacks) {
    attack.use({options:{primaryAttack:false}, skipDialog: true} );
  }
}

function collect_attacks(actor) {
  return item.allItems.filter(attackFilter);
}


function divide_attacks(attacks) {

  let main_attack = null;
  let secondary_attacks = [];

  for (const attack of attacks) {
    if (attack.system?.weaponGroups?.base?.[0] === "natural"){
      secondary_attacks.push(attack);
    } else if (!main_attack){
      main_attack = attack;
    }
  }
  if (!main_attack && secondary_attacks.length > 0){
      main_attack = secondary_attacks.pop();
  }

  return [main_attack, secondary_attacks];
}
