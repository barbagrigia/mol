module $.$mol {
	
	export class $mol_linker extends $.$mol_linker {
		
		@ $mol_prop()
		uri() {
			return this.argument().link( this.patch() )
		}
		
		current() {
			return this.uri() === this.argument().link( {} )
		}
		
	}
	
}
