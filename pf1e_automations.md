# Introduction

Hey! I tend to play a lot of Pathfinder 1e on Foundryvtt.
I also like to waste my time automating parts of the game.
So here are some of those automations!

## Mythic Trickster

### Fickle Attack (Ex)

Whenever you roll damage for a melee or ranged attack with a weapon or alchemical item,
you can treat any natural 0s on the damage dice as if they were the highest possible number on those dice.
You can select this ability up to three times.
The second time you select it, treat 1s and 2s as the highest value.
The third time, treat 1s, 2s, and 3s as the highest value

---

So there isn't straightforward way (that I know of) to implement this using a single roll function.
However by not bashing your head into trying to change a 1 into an x for a dx diceroll it opens up some options.

#### Calculation

Let:
x = number of dice
y = number of faces
z = number of times Fickle Attack was selected

$${x}d{y}max{y - z} + (z) * x$$

So for x = 2, y = 6, z - 1:
$$ 2d6max5 + 1 * 2 $$

#### Justification

For a d6 diceroll we want to achieve the following result.
1, 2, 3, 4, 5, 6
Turns into:
6, 2, 3, 4, 5, 6

A roll:
1, 2, 3, 4, 5, 6

max5:
1, 2, 3, 4, 5, 5

Shift results by 1:
2, 3, 4, 5, 6, 6

#### Calculation

#### Alchemist-Specific
