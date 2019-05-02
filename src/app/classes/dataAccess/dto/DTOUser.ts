export class DTOUser
{
    private curp :string;
	private nameprivate :string;
	private lastname_a :string;
	private lastname_b :string;
	private birthday: :string;
	private role :string;
	private nickname :string;
	private hash_password :string;
	private active:boolean;
    private contact :string[];
    constructor(){}
    //GETTERS
    public getCurp():string
    {
        return this.curp;
    }
}
