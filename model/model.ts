class $mol_model extends $mol_object {

	static history< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_history.value( `${this}.${key}` , ...diff )
	}
	history< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_history.value( `${this}.${key}` , ...diff )
	}

	static session< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_session.value( `${this}.${key}` , ...diff )
	}
	session< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_session.value( `${this}.${key}` , ...diff )
	}

	static local< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_local.value( `${this}.${key}` , ...diff )
	}
	local< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_local.value( `${this}.${key}` , ...diff )
	}

	static argument< Value >( key : string , ...diff : Value[] ) {
		return $mol_state_arg.value( `${this}.${key}` , ...diff )
	}
	// argument< Value >( key : string , ...diff : Value[] ) {
	// 	return $mol_state_arg.value( `${this}.${key}` , ...diff )
	// }
	argument< Value >() : $mol_state_arg< Value > {
		var owner = this.objectOwner()
		if( owner instanceof $mol_model ) return owner.argument()
		return new $mol_state_arg< Value >()
	}

}
