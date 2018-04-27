const proxyquire = require( 'proxyquire' );

describe( 'The ./lib/expandNamespaces function', ()=>{
 
  it( 'should keep paths without namespaces unchanged', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': sinon.stub()
    } );

    const expected = './somePath';
    const actual   = expandNamespaces( expected );

    expect( actual ).to.equal( expected );

  } );

  it( 'should return the relative path of expandNamespace.js', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': ()=>( { namespaces: { expandNamespace: './lib/expandNamespace.js' } } )
    } );

    const expected = '<expandNamespace>';
    const actual   = expandNamespaces( expected, __dirname );

    expect( actual ).to.equal( '../lib/expandNamespace.js' );
  
  } );

  it( 'should throw an error when the namespace does not exists', ()=>{

    const expandNamespaces = proxyquire( '../lib/expandNamespace', {
      './loadNamespaces': ()=>( { namespaces: { } } )
    } );

    const expected = '<expandNamespace>';

    expect( ()=>{

      expandNamespaces( expected, __dirname );
    
    } ).to.throw( 'namespace <expandNamespace> is not defined.' );
  
  } );

} );
