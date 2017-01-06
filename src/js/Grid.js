class Grid
{


    /**
     * Instantiate a Grid object with a set width and height
     * @param {int}   width   Width of grid
     * @param {int}   height  Height of grid
     * @param {array} blocked Array of blocked coordinates
     */
    constructor(width = 10, height = 10, blocked = [])
    {

        this.width  = width;
        this.height = height;
        this.blocks = [];

        /*
         * Create all blocks within the grid
         */
        for (let x = 1; x <= width; x++)
        {

            this.blocks[x] = [];

            for (let y = 1; y <= height; y++)
            {
                let isBlocked     = (blocked.indexOf(x + ',' + y) > -1);
                this.blocks[x][y] = new Block(this, x, y, isBlocked);
            }

        }

    }


    /**
     * Get the block at given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     * @throws exception if a block does not exist at the given coordinates
     */
    getBlockAtCoordinate(x = 1, y = 1)
    {

        let blocks = this.blocks;

        if (typeof(blocks[x]) !== 'undefined' && typeof(blocks[x][y]) !== 'undefined')
        {
            return blocks[x][y];
        }

        throw 'Block at grid coordinate ' + x + ',' + y + ' does not exist';

    }


    /**
     * Calculate the distance between two blocks
     * @param  {Block} firstBlock  First block to check distance between
     * @param  {Block} secondBlock Second block to check distance between
     * @return {float}             Distance between blocks
     */
    calculateDistanceBetweenBlocks(firstBlock, secondBlock)
    {

        let xDiff    = Math.abs(firstBlock.x - secondBlock.x);
        let yDiff    = Math.abs(firstBlock.y - secondBlock.y);
        let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

        return distance;

    }


    /**
     * Get blocks adjacent to a given block
     * @param  {Block} block          Block object to get adjacent blocks to
     * @param  {bool}  includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @return {array}                Array of Block objects
     */
    getAdjacentBlocks(block, includeBlocked = true)
    {

        let nearby   = [];
        
        /*
         * Traverse the rows
         */
        for (let x = -1; x <= 1; x++)
        {

            /*
            * Traverse the columns
            */
            for (let y = -1; y <= 1; y++)
            {

                let targetX       = (block.x + x);
                let targetY       = (block.y + y);
                let isCentreBlock = (x == 0 & y == 0);
                let isOnGrid      = (targetX > 0 && targetX <= this.width && targetY > 0 && targetY <= this.height);

                /*
                 * Only include blocks that are actual neighbours and haven't
                 * been marked as 'blocked'
                 */
                if (!isCentreBlock && isOnGrid)
                {

                    let targetBlock = this.blocks[targetX][targetY];

                    if (includeBlocked || !targetBlock.isBlocked)
                    {
                        nearby.push(targetBlock);
                    }

                }
                
            }

        }

        return nearby;

    }


}