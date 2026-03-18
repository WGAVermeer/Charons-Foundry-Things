new Dialog({
  title: "Enter d20 Result",
  content: 
    <form>
      <div class="form-group">
        <label>d20 Result:</label>
        <input type="number" name="die" min="1" max="20" value="20"/>
      </div>
    </form>
  ,
  buttons: {
    roll: {
      label: "Roll",
      callback: async (html) => {
        const value = Number(html.find('[name="die"]').val());

        if (value < 1  value > 20 
 isNaN(value)) {
          ui.notifications.error("Invalid d20 result (must be 1–20)");
          return;
        }

        const roll = await new Roll("1d20").evaluate({ async: true });

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
