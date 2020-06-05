/* Generate a ticketID */

module.exports = {
    createTicketId() {
        let chars = '1234567890ABCDabcd';
        let randomSerial = '';
    
        for (let i = 0; i < 6; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            randomSerial += chars.substring(randomNumber, randomNumber +1);
        }
        return randomSerial;
    }
}