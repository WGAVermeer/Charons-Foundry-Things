new Dialog({
  title: "Charon's Dice Fudger!",
  content:` 
    <form style="display: flex; justify-content: center">
      <div class="form-group" style="display: flex; align-items:center, gap:5px;">
        <label style="margin-right: 8px; flex: 0 0 auto">Enter wanted dice result:</label>
        <input type="number" style="width: 30px; flex: 0 0 auto" name="dieResult" min="1" value="20"/>
        <span style="width: 10px; flex: 0 0 auto;">d</span>
        <input type="number" style="flex: 0 0 auto; width: 30px;"name="dieSize" min="1" value="20" />
      </div>
    </form>
  `,
  buttons: {
    roll: {
      label: "Roll",
      callback: async (html) => {
        const size = Number(html.find('[name="dieSize"]').val());
        const value = Number(html.find('[name="dieResult"]').val());

        if (value < 1 || value > size || isNaN(value)) {
          ui.notifications.error(`Invalid d${size} result (must be 1–${size})`);
          return;
        }

        const roll = await new Roll(`1d${size}`).evaluate({ async: true });

        // Force the die result properly
        roll.terms[0].results[0].result = value;
        roll.terms[0].results[0].active = true;

        // Recalculate total correctly
        roll._total = roll._evaluateTotal();

        await roll.toMessage({
          emote: true,
          speaker: ChatMessage.getSpeaker({ actor })
        });

      }
    },
    cancel: {
      label: "Cancel"
    }
  },
  default: "roll"
}).render(true);
