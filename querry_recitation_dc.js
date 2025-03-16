new Dialog({
  title:'Recitation level',
  content:`
    <form>
      <div class="form-group">
        <label>Recitation level</label>
        <input type='number' name='ret_level' min="1" max="6"></input>
      </div>
    </form>`,
  buttons:{
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`
    }},
  default:'yes',
  close: html => {
    let result = html.find('input[name=\'ret_level\']');
    if (result.val()!== '') {
        console.log(result.val())
        let chatData = {
	        user: game.user._id,
	        speaker: ChatMessage.getSpeaker(),
	        content: result.val()
	    };
	    ChatMessage.create(chatData, {});
      }
    }
}).render(true);

