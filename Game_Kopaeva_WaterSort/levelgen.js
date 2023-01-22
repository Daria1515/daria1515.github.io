//calls make_level_new and prepare a level for insertion to the HTML
function make_level(n, dif = 0) {
    let bottles = make_level_new(n, dif)

    // cleanup
    for (const bottle of bottles) {
        for (let i = bottle.children.length - 1; i > 0; i--) {
            if (bottle.children[i].style.backgroundColor != bottle.children[i-1].style.backgroundColor) {
                continue
            }
            add_height(bottle.children[i-1], get_height(bottle.children[i]))
            bottle.removeChild(bottle.children[i])
        }
        cap_full_with_single_color(bottle)
    }

    let level = document.createElement("div")
    level.classList.add("level")
    level.replaceChildren(...bottles)
    return level
}

//generates a level
function make_level_new(n, dif = 0) {
    let bottles = []

    const random = random_generator(n)
    const difficulty = Math.log(n) * 1.5 + 2 + dif
    const color_count = Math.floor(difficulty)
    const layer_size = Math.floor(15 / Math.log10(n+3) - 15 / n)

    // make full bottles first
    for (let i = 0; i < color_count; i++) {
        const color = color_list[i % color_list.length]
        bottles.push(add_bottle(color))
    }
    // two extra empty bottles
    for (let i = color_count; i < 2 + color_count; i++) {
        bottles.push(add_bottle())
    }

    let count = 0
    const move = (source, target, amount) => {
        ++count
        amount = Math.min(amount, get_bottle_space(target))
        if (amount == 0) {console.log("zero move during levelgen")}
        add_water(target, source.lastChild.style.backgroundColor, amount)
        remove_water(source, amount)
    }
    // move something into one of the empty bottles
    move(
        bottles[random(color_count)],
        bottles[color_count],
        (random(Math.floor(BOTTLE_HEIGHT/layer_size-1)) + 1) * layer_size
    )

    const last_bottle = bottles[color_count+1]
    movable = bottles.slice(0, -1)
    for (let loops=0; loops<1000; loops++) {

        // check all bottles if they have enough space to be moved
        for (let i = movable.length-1; i >= 0; i--) {
            if (get_height(movable[i].lastChild) < layer_size * 2) {
                movable.splice(i, 1)
            }
        }
        // generate chains until all splits are too small for defined difficulty
        if (movable.length < 2) {
            break
        }

        // then generate a chain move which will be solved by moving something into
        // the last empty bottle, then in a row filling some water into the just emptied space
        // and finally emptying the bottle
        let chain = [last_bottle]
        let opts = movable.slice()
        let amount = layer_size + random(3)
        let difficulty_ramp = Math.floor((opts.length-2) * (difficulty-color_count))
        let chain_length = Math.min(2 + random(opts.length-1) + random(difficulty_ramp), opts.length)
        for (let i = 0; i < chain_length; i++) {
            let x = random(opts.length)
            chain.push(opts[x])
            opts.splice(x, 1)
        }

        let move_made = false
        for (let i=0; i < chain.length - 1; i++) {
            // each chain move does a bottom split of the top color,
            // leaving space for any move generated above
            let amt = get_height(chain[i+1].lastChild) - amount
            if (amt <= 0) {
                chain.splice(i+1, 1)
                i--
                continue
            }
            move_made = true
            move(chain[i+1], chain[i], amt)
            // for each step, generate a chance that something has to be moved into the bottle
            // during the operation from a bottle not participating in the chain
            let target_space = get_bottle_space(chain[i+1])
            if (target_space > amount && opts.length && random(opts.length) * random(movable.length) == 1) {
                let third = random(opts.length)
                if (get_height(opts[third].lastChild) > amount * 2) {
                    move(opts[third], chain[i+1], Math.min(amount, target_space - amount))
                }
                opts.splice(third, 1)
            }
        }
        if (move_made) {
            move(last_bottle, chain[chain.length-1], get_height(last_bottle.lastChild))
        }
        for (const target of bottles) {
            if (!last_bottle.children.length) {
                break
            }
            if (get_bottle_space(target) > 0) {
                move(last_bottle, target, get_height(last_bottle.lastChild))
            }
        }
    }
    
    localStorage.setItem("gen-moves", count)
    
    return bottles
}