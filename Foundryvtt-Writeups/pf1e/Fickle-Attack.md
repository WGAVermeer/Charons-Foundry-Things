
---

# Mythic Trickster

## Fickle Attack (Ex)

Whenever you roll damage for a melee or ranged attack with a weapon or alchemical item,  
you can treat any natural 0s on the damage dice as if they were the highest possible number on those dice.  

You can select this ability up to three times.  

- The second time you select it, treat 1s and 2s as the highest value.  
- The third time, treat 1s, 2s, and 3s as the highest value.

---

So there isn't straightforward way (that I know of) to implement this using a single roll function.  
However, by not bashing your head into trying to change a 1 into an x for a dx diceroll, it opens up some options.

---

## Calculation

**Let:**

- x = number of dice  
- y = number of faces  
- z = number of times Fickle Attack was selected  

$$
(x)d(y)\text{max}(y - z) + (z) * (x)
$$

**Example:**  
For x = 2, y = 6, z = 1:

$$
2d6\text{max}5 + 1 * 2
$$

---

## Justification

For a d6 diceroll we want to achieve the following possible result:  
1, 2, 3, 4, 5, 6  

Which with Fickle Attack should become:  
6, 2, 3, 4, 5, 6  

Or shifted around:  
2, 3, 4, 5, 6, 6  

---

So our goal is that dice result.

A normal 1d6 roll has the following possible face values:  
1, 2, 3, 4, 5, 6  

After using our max5 function:  
1, 2, 3, 4, 5, 5  

Shift results by 1 (z):  
2, 3, 4, 5, 6, 6  

Tada! Goal achieved!

Completely clear right? ... Right?

---

The above really gives us this variant of a function:  
$1d6\text{max}5 + 1$  

But we can revert this back to the general form by choosing our values for x, y, z correctly.  

Here x = 1, y = 6, z = 1  
→ $(x)d(y)\text{max}(y - z) + (z) * (x)$  

---

## Alchemist-Specific

If your dice aren't as static as choosing one value for the next 10 levels, it might be handy to put a bit more time into automating it.

For alchemist I did the following using my earlier formulas:

Base damage:
```text
1d6max5 + 1
```
Scaling damage:
```text
(ceil(@class.level / 2) - 1)d6max5 + 1 * (ceil(@class.level / 2) - 1)
```

The only real difference here is that the value for x is dynamic.

x = (ceil(@class.level / 2) - 1)
