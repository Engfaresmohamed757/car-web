// Authentication System for AutoParts Egypt
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSO');
        this.sessions = JSON.par[]');
       tem;m = AuthSyste.AuthSys
windowuse global xport for

// E);;
}thSystem() new Auauth =   window. => {
 ', ()tentLoadedr('DOMConventListenedEcument.adtem
dosysh alize aut/ Initi

/
}   }
    }
     l');in-modaal('logowModthis.sh           {
    } else 
     allback();           c) {
 ()LoggedIn(this.is        if  {
h(callback)quireAut  
    re
    }
  r !== null;rrentUsethis.cu    return {
    n() ggedI   isLo    
 er;
    }
rrentUscuis. theturn{
        r) r(tUse  getCurren }
    
  
   s));y(this.userN.stringifsers', JSOarts_u'autopem(setIttorage.lS       loca{
 ers()   saveUs
    
  
    }str(2, 9);ubring(36).soSt).trandom(h.' + Mat() + '_te.now'user_' + Dareturn        () {
 serIderateU
    gen
      }gle();
  WithGooin   this.log {
     ()erWithGoogleegist
    r
    }
        };
    id.prompt()ccounts.    google.a        
 {w.google)indo   if (w
     oogle() {nWithG    logi  }
    
');
  ', 'successنجاحخول بجوجل بلدسجيل اcation('تم تotifihowN     s);
   ter-modal'al('regisis.closeMod      th
  ');odalin-mseModal('logclo    this.se);
    alser(user, fs.loginU     thi     
     }
        
 );sers(this.saveU        r);
    push(uses.eris.us  th             
           };
               }
            true
cations:    notifi     
           cy: 'EGP',ren cur              'ar',
     e:  languag                 {
   rences:       prefe    ],
      orders: [             
  s: [],resse  add    
          (),toISOString new Date(). createdAt:              ub,
 load.sayoogleId: p          g
      usersgle or Goosword f, // No paspassword: ''          ,
         phone: ''            
 .email,oad: paylail  em         name,
     amily_oad.fpayle:  lastNam          ,
     d.given_nameoapaylame:   firstN              (),
IdeUser.generatis  id: th            
  er = { us           ata
 Google dser fromreate new u  // C         er) {
  if (!us              
);
 d.emailayloal === pai => u.emfind(us.userser = this.   let u   
     1]));
     )[.'it('l.spliae.credentresponsse(atob(JSON.parad = st paylo      cone
  esponsign-In rGoogle SHandle      // ) {
   responsesponse(leReGoog
    handle    }
         }
  }
       ;
      uccess')ب', 'sسا الحtion('تم حذفificaNot        show;
        le-modal')dal('profiloseMo   this.c            
 t();is.logou       th         sers();
 this.saveU               ex, 1);
e(userIndsers.splicthis.u              {
   -1) ex !==if (userInd    
        tUser.id);.curren this ===(u => u.idex.findInd this.userserIndex =nst us      co       {
))نه.'ن التراجع عجراء لا يمك الإذا؟ هابالحستأكد من حذف أنت مfirm('هل (con if 
       ount() {deleteAcc
        }
      }
     );
 ss', 'succeعنوان' الon('تم حذفowNotificati       shs();
     oadAddresse.lthis          s();
  eUser   this.sav
         1);(index, ses.splice.addresertUsenurr    this.c     )) {
   ان؟'ف هذا العنويد حذnfirm('هل تر      if (co {
  x)ress(inde deleteAdd}
    
     }
      ss');
    succe ' بنجاح',ضافة العنوانation('تم إificwNot  sho
          dresses(); this.loadAd           sers();
s.saveU         thi       
      });
            tring()
  SOStoIate(). new DAt:reated    c         
   ne,ry, pho, countty ciet,retitle, st             ({
   es.pushssddrentUser.a this.curre
                          }
       ;
  ses = []eser.addrntUshis.curre       t       sses) {
  ntUser.addreis.curre (!th     if     
   phone) {ry &&countcity && && reet e && st(titl      if   
  
      تف:');قم الهاprompt('ر= phone const        
 ('البلد:');ry = prompt const count;
       ')('المدينة:mpt proconst city =);
        قم:' والررعلشاmpt('اtreet = pro const s   ');
    العمل):لمنزل، نوان (مثل: اt('عنوان العe = prompnst titl  co() {
        addAddress     
  }
 
         }cess');
 sucجاح', 'بنظ التغييرات ion('تم حفhowNotificat         s;
   ()MenuupdateUser       this.s();
     his.saveUser          t   
  
         ').value;one'profile-phyId(.getElementBe = documenthonrentUser.p.cur  this
          ).value;astName'file-ltById('promentEleocument.gestName = dUser.lacurrenthis. t        e;
   alustName').vile-firId('proftElementBycument.ge = domeNaer.firstis.currentUs        th
    r) {.currentUse if (this) {
       eProfile(pdat   u 
 
    }in('');
      `).jo   
   </div>         
      </div>         
   phone}</p>${address.      <p>             /p>
 y}<countrs.dres.city}, ${address   <p>${ad          
       </p>et}ess.streddr{a  <p>$                ls">
  etai-dddressss="aiv cla          <d  /div>
            <      
   </button>         
          "></i>as fa-trashss="fcla        <i            )">
     x}ss(${indedreeleteAdick="auth.d" onclall dangertn-sm"bn class=tobut     <            rong>
   tle}</stddress.tirong>${a  <st            ">
      eaderess-hs="addrclas    <div           em">
  dress-itclass="ad<div          ) => `
   indexs, esddrs.map((asse = addrerHTMLinner.  containe             

 
        }return;    
        </p>';ناوين محفوظةا توجد عp>لTML = '<iner.innerH conta
           = 0) {h ==es.lengtessdr(ad      if       

    es || [];er.addressUsntis.curreths = addresseconst    ;
     sses')user-addreId('mentByment.getEleer = docuntain    const co
     {ddresses() loadA
    
   '');
    }join( `).
        </div>          </div>
             /p>
    }</span><usstatrder.>${o}"der.statusus-${orat"stn class=حالة: <spaالp>      <           
   >tal)}</pr.toncy(orde.formatCurrenManager{translatio $لي:ماالإج       <p>           >
  }</pngthder.items.leالقطع: ${or<p>عدد              >
       ls"-detairderlass="o  <div c                 </div>
           pan>
  t)}</sdAcreate(order.tDateager.formationManranslaate">${ter-ds="ordaspan cl          <s        trong>
  der.id}</sg>طلب #${or    <stron              ader">
  order-hess="iv cla         <d">
       itemer-ass="ord    <div cl    r => `
    ers.map(orde= userOrdinnerHTML r.ine  conta  
                 }
  ;
    return       ة</p>';
  ابقتوجد طلبات سL = '<p>لا erHTMner.inn contai     {
      ) h === 0engterOrders.l if (us
       ;
        
        )emailser.his.currentU.email === tmerInfoustorder.cmerInfo && ocusto      order.=> 
      lter(order ().fiOrdersgetderManager.ers = orerOrd   const us   );
  orders''user-ntById(tElemecument.geiner = dota con     const   ory() {
OrderHist  load    
  
    }

        }phone;ntUser.is.curreue = thone').val'profile-phyId(tElementBt.ge  documen    il;
      tUser.ema this.curren.value =il')-emaprofilementById('lement.getE     docu
       ame;er.lastNrentUs.curalue = thislastName').v('profile-ntByIdent.getEleme  docum
          .firstName;currentUserue = this.me').valtNarofile-firsmentById('pnt.getEleumeoc         d  ntUser) {
 s.curre (thi  if() {
      ileInfoloadProf   
    
 
    };
        }ileInfo()his.loadProf t        o') {
   -inffile=== 'proe if (tabId        } elss();
 ressehis.loadAdd           tsses') {
 === 'addref (tabId  } else i      );
 rderHistory(.loadOthis       y') {
     storr-hi'orde (tabId ===  if       n tab
sed otent baonoad c      // L        
  ;
'active')t.add().classListById(tabIdetElemenent.g  docum;
      ive').add('actst"]`).classLi"${tabId}-tab=or(`[dataquerySelectument. doc  
      contentndd tab ateo selecss tctive cla // Add a  
       ));
      ove('active'lassList.remntent.c> coch(content =rEafontent')..tab-coectorAll('ySelt.quer  documen);
      'active')e(ssList.remov => btn.claach(btnrEtn').fob-b'.taectorAll(ySelernt.qume   docuts
     enabs and cont from all tve classtiove ac    // RemId) {
    b(tabhTa
    switc   }
   
    };
      e('open')movclassList.rewn.opdo         drn) {
   opdow    if (dr
    ');own('user-dropdmentByIdtEledocument.gedown = const drop {
        Dropdown()oseUser  
    cl   }
      }
 en');
    gle('opssList.togdown.cladrop          wn) {
  opdoif (dr        ;
-dropdown')userId('getElementBynt.wn = documeonst dropdo c    n() {
   owerDropdtoggleUs
      }
    '';
  w = e.overfloyly.stbod   document.;
     ne'lay = 'noyle.dispodalId).stmentById(mt.getEle documen{
       (modalId) loseModal c}
    
   ;
    dden''hiow = overfly.style.ment.bod    docuflex';
    = 'yle.display lId).stdamoId(entByent.getElem    docum    ) {
modalId  showModal(
  
     }
    }me;
       rstNarrentUser.fihis.cu= tnt onteName.textC user      ) {
     er.currentUsthis && if (userName;
        .user-name')ector('querySelocument. d =t userNamecons
        Menu() {erteUs 
    upda    }
    }
       uHTML);
serMeneend', uML('beforcentHTertAdjansions.i  navAct   {
        (navActions)  if ;
      -actions')'.navctor(ySelent.quer documeons =ti const navAc           
 
     `;iv>
               </d
     </div>              >
  </a            خروج
      سجيل ال> تt-alt"></ia-sign-ouas fs="fi clas      <              t()">
    uth.logouk="anclic"#" oref=        <a h              </a>
         
         العناوين-alt"></i> -markermapa-as f<i class="f                        >
ddresses()"th.showA"au" onclick=a href="#      <       
       </a>             اتي
        طلب></i>"ping-baga-shoplass="fas f   <i c                  ">
   rHistory().showOrde="authickcl="#" on<a href             a>
             </           شخصي
    الملف الer"></i>a-us fasclass="fi       <                
  modal')">file-l('proowModa.shuth"ack=cliref="#" on   <a h                
 n">r-dropdow"usedown" id=ser-dropss="uv cladi          <
       </button>               >
"></ion-downvrhe"fas fa-c  <i class=             an>
     </spfirstName}rrentUser..cu>${thiser-name" class="us  <span                r"></i>
  fa-useclass="fas          <i          ">
  erDropdown()oggleUs"auth.t" onclick=er-btnn class="us<butto              
  -menu">seriv class="u      <d
      TML = `enuHonst userM
        cu() {Men createUser      
}
     yles);
 navAuthStreend',tHTML('befoAdjacenerthead.ins  document.  
      ;
         `e>
     yl    </st
                  }       }
               -2);
    pacing--sadding: var(      p              
    tn-nav { .auth-b                  
                    
           }         
 ne;noay: spl    di                    nav span {
 .auth-btn-               
    : 768px) {(max-widthia   @med              
                  }
             ;
 91c1cound: #b  backgr                 r:hover {
 nav.registe-btn-      .auth    
                             }
 ;
        ary-color) var(--primlor:co border-              ite;
     or: whcol          
          lor);rimary-co--p var(und:ckgro        ba       {
     er stegibtn-nav.r     .auth-
                               }
  
          ry-color);ma(--priar: vr-colorrde  bo                  white;
   color:             );
     colorary-: var(--primgroundback                 ver {
   hotn-nav:h-b      .aut
                               }
       tion);
    -transivar(-n:    transitio                 ;
-size-sm) var(--fontsize:t-        fon            ;
g-2)ar(--spacin     gap: v            nter;
   n-items: ce       alig      x;
       isplay: fle        d            ;
erpointcursor:             
        radius: 6px;r-   borde                
 -3);ar(--spacingacing-2) v var(--sp  padding:            
      rimary);text-par(--r: vlo   co             
    -color);rder--boar( volid ser: 1px bord         
          -color);ace-surfr(-d: va backgroun                   btn-nav {
th-       .au  
                        }
             er;
  : cent align-items             -2);
      --spacingr(  gap: va               lex;
     display: f        
          -buttons {      .auth
          <style>      
      yles = ` navAuthStnst  co
      nav buttonsor d styles f Ad
        //   
         }    nsHTML);
uttothB, aureend'fo'bejacentHTML(.insertAdionsnavAct            ions) {
navAct   if (     s');
.nav-actionySelector('er.qus = document navAction     const    
      `;
    /div>
            <     button>
</              </span>
  ">إنشاء حسابgistere="auth.reatsl data-tranpan    <s            i>
    r-plus"></uses fa-ss="fa <i cla            
       -modal')">al('registershowModh."autlick=ter" onc regisbtn-nav"auth-n class=  <butto           >
   button      </     >
     الدخول</spanin">تسجيل og="auth.llateta-transn dapa     <s             </i>
  in-alt">as fa-sign-s="fas   <i cl               )">
  al'n-modgial('loauth.showModick="v" onclbtn-na="auth-ton class<but            ns">
    tto-bu"authdiv class=         <= `
   HTML ttonsst authBu   con
     ttons() {ButhteAu 
    crea
    }
     }   }
        ;
       hButtons()reateAutis.c      th  {
        hButtons) (!aut        if ';
    'nonelay = u.style.dispserMenu) u (userMen     if
       y = 'flex';pla.style.dishButtonsut aauthButtons) if (       menu
    er ushide  buttons, Show auth//           else {
    }        }
         ;
  nu()erMes.updateUs    thi         k';
   blocplay = 'u.style.disrMen         use
       else {         }    ;
erMenu()is.createUs  th           u) {
    (!userMen         if
    'none';lay =sp.style.dittonstons) authBuif (authBut          menu
   s, show user buttonth/ Hide au    /      ser) {
  urrentU  if (this.c         
     -menu');
'.userlector(uerySeument.qnu = docnst userMe
        cotons');-buttor('.authquerySelecment.ns = docuhButtonst aut       coface() {
 IntereUser   updat 
 }
   
         }}
             rface();
  ateUserInte.upd  this          ser;
    entUser = u.curris th       
        ) { if (user          
 Id);session.user=== (u => u.id sers.find.uuser = thisonst    c       n) {
   if (sessio  
           
  || 'null');session') 'autoparts_tItem(age.geionStorss      se                          | 
  sion') |arts_ses('autopetItem.gocalStoragerse(lon = JSON.passi    const se
    {Session() 
    check    
    }
 }       ut');
'user_logovent(tics.trackE     analy
       ) {analyticswindow.if (     t
   ogout evenTrack l    //      
    ;
   ')successجاح', 'ل الخروج بنn('تم تسجيificatioowNot       shce();
 serInterfahis.updateU  t   on');
   oparts_sessim('autemoveItetorage.rionS sess     ;
  n')parts_sessio('autoveItem.remoStorage      localll;
  ser = nuurrentU      this.c() {
  out
    log
      }     }
  });
           '
    'email   method:            ser.id,
  _id: uer     us       in', {
    r_logent('useics.trackEvlyt       ana
     ) {yticsdow.anal   if (win
     login event Track  //         
     erface();
 erIntpdateUs      this.u     
    }
      
   ssion));gify(se, JSON.strin_session'utopartsItem('arage.setSto session
            else { }
       ));fy(sessionstringi JSON.ession',ts_sparm('autorage.setIteocalSto         l
   r) {beremem  if ( 
            ;
    }er
     mbreme        g(),
    ISOStrintow Date().tedAt: ne   crea       d,
   user.ierId:          us
  sion = {esst scon  er;
      er = usrentUs    this.cur
    member) {r, reinUser(use   log 
 
    }
           });
ود', 'error' موجروني غيركت الإلtion('البريدowNotifica       shlse {
       } e      ');
modalrgot-odal('fo this.closeM      
     ');', 'successالإلكتروني بريدك ور إلىكلمة المرط استعادة ل راب'تم إرساation(ific  showNot   
       emailp, send  real ap a    // In       er) {
   if (us  
      );
      = email u.email ==ind(u =>.users.f = this  const user
      alue;-email').vgot('forementByIdcument.getEldoil = st ema con      () {
 PasswordandleForgot
    
    hs');
    }اح', 'succesب بنجلحسام إنشاء اn('تwNotificatiosho  );
      er-modal'l('regists.closeModathi    lse);
    User, far(news.loginUse    thi();
    is.saveUsers    ther);
    push(newUs.users.      this
            };
       }
    rue
        tfications:  noti           ',
   ency: 'EGP   curr             age: 'ar',
ngu         la: {
       preferences     ,
       ders: []    or
        ], [addresses:      g(),
      toISOStrinnew Date(). createdAt:           assword,
       p
         phone,           email,
        ame,
  tN     las    stName,
    fir           Id(),
teUserenera this.g  id:    = {
      nst newUser        conew user
 Create       //   
  }
              return;
   
         'error');لفعل', مستخدم باالإلكتروني ('البريد tionNotifica   show{
         il)) == ema=> u.email =d(u .users.finf (this i
            }
     
         return;       r');
  ابقة', 'erroرور غير متطات المn('كلمcatiohowNotifi      s      rd) {
firmPasswo!== conord  (passw       ifidation
 Val    //      
    value;
   ).word'-confirmPassisterregentById('nt.getElem= documeword onfirmPass  const ce;
      word').valuer-passd('registntByIetEleme.gocumentssword = donst pa
        ce;aluer-phone').vId('registetElementBycument.ge = dost phon       con').value;
 ailster-emtById('regiElemenument.get docil =st emacon     e;
   .valuame')ster-lastNyId('regietElementBent.ge = documamt lastN cons
       e;).valuirstName'ter-fgisId('retByt.getElemenocumentName = d const firs) {
       ster(  handleRegi   
  
     }
    }');
    , 'errorر غير صحيحة'مرواللمة و ككتروني أريد الإلcation('البwNotifi   sho
         e {   } els);
     , 'success'جاح'بنخول الد'تم تسجيل cation(tifiowNosh    
        l');moda'login-loseModal(  this.c         ber);
  rememr,oginUser(useis.l     th       {
ser) if (u      
   ;
       sword)ord === pas u.passw email &&.email === => users.find(us.u = thiconst user         
      ked;
 -me').checrememberntById('Eleme.getmentocuer = d rememb      constvalue;
  password').d('login-yIementBment.getEld = docuonst passwor c
       alue;n-email').vntById('logietElemet.g= documenonst email      c) {
   dleLogin(    han
    
 };
    }
                  };
         }))
        nd(this.biponsegleResdleGoock: this.han    callba           ID
     ent ctual clilace with a, // RepD'NT_ILE_CLIE'YOUR_GOOGlient_id:         c          ({
  tializes.id.ini.accountoogle   g         
    e) {w.googlif (windo        > {
    load = () =.on    script      
      
script);ndChild(appeent.head.  docum    = true;
  er cript.def  s       true;
async = script.
       i/client';e.com/gsglooounts.g://acc 'httpst.src =scrip        
ipt');('screntlem.createEdocumentcript =  const s      API
  gle Sign-In// Load Goo   
     {leAuth() pGoog
    setu      }
    });
   }
             own();
  ropdrDs.closeUse       thi  
        {pdown'))ser-droclosest('.ue.target. (!if  } else           opdown();
erDrs.toggleUs        thi        {
-btn')) '.userclosest(arget. (e.t  if         => {
 , (e) click'istener('t.addEventL    documenpdown
     dro User  // 
      
              });     }
 ;
       taset.tab)rget.daTab(e.tatch   this.swi             {
 tab-btn'))contains('sList.get.clas   if (e.tar       (e) => {
  'click', ntListener(Evet.add  documen   ng
   witchib s     // Ta         
 
    });  }
              ;
 ateProfile()is.updth            
    Default();e.prevent           m') {
     rofile-fort.id === 'pge if (e.tar     } else      ssword();
 leForgotPathis.hand            
    ult();efa e.preventD             {
   got-form') === 'for(e.target.id } else if        
    ister();ndleRegis.ha     th          fault();
 ntDee.preve              orm') {
  'register-f=== rget.id lse if (e.ta   } e    );
     leLogin(nd  this.ha            lt();
  Defau e.prevent       {
        -form')  'login.id === (e.target   if
          { =>ubmit', (e)stener('sdEventLient.ad      documm
  gin for/ Lo
        /) {ners(ventListetupEse
    
    }
    s);, styleeend'('befordjacentHTMLhead.insertA   document.    
     
        `;e>
    </styl             }
                      }
        
     -size-sm);fontze: var(--    font-si           ;
         50%flex: 1 1                       ab-btn {
            .t             
                
    }          p;
       p: wra-wraflex                      {
  bs e-ta .profil                  
                     }
                fr;
    -columns: 1atetempl      grid-                  w {
m-roor          .f            
             }
                         g-2);
var(--spacin   margin:                  5%;
    h: 9idt     w                
   h-content {   .aut           x) {
      width: 768p(max-media            @   
            }
                     h: 150px;
  min-widt                uto;
      width: a                {
 ect ng-item selti .set      
               
                    };
      ght: 500 font-wei                    label {
tting-item         .se  
                          }
        enter;
    clign-items:    a             
   tween; space-bet:stify-conten        ju           flex;
 display:                  {
    etting-item    .s          
                
            }      pacing-4);
gap: var(--s                
    on: column;lex-directi          f         ay: flex;
        displ            -list {
 ngs     .setti        
               
          }      or);
    col--border-var( solid er: 1px      bord            g-3);
  spacinar(--n-bottom: v margi              px;
     s: 6diur-ra      borde              ing-3);
r(--spac vading: pad               r);
    rface-colod: var(--suckgroun      ba          m {
    teaddress-i      .    ,
      order-item   .              
          
           }        );
  ing-4--spacar(ttom: vin-bomarg           
         st {-liesress      .add       t,
   lisers-rd         .o
                   
             }       y: block;
la  disp                ive {
  act-content.tab        .              
         }
            ;
     y: none     displa          ent {
     b-cont    .ta        
                          }
 
         ;ing-4)-spac var(-padding:                  
  t-area {ontene-cprofil        .          
                     }
        
 ry-color);--primaor: var(ttom-col   border-bo              r);
   loary-corimr(--pr: va        colo            .active {
.tab-btn               
                 }
                arent;
ransppx solid tttom: 3r-bo     borde        );
       --transitionion: var(     transit              pointer;
 or:         curs          e;
   non   border:          ne;
       nokground:       bac             
 );g-3acinng: var(--spddi       pa       1;
      :    flex           
       .tab-btn {            
                    }
            color);
   (--border-d var 1px solim:bottoborder-                     flex;
isplay:        d      bs {
      profile-ta           .            
         }
      
           none;er-bottom:       bord            child {
 last-n a:r-dropdowse      .u                 
    }
                  );
   rface-color(--sukground: var bac                 er {
  :hovropdown a .user-d                   
        }
                 );
   orrder-colbod var(--1px solir-bottom: borde                ion);
    -transitition: var(-      trans             one;
 tion: ncora-de        text          y);
  t-primar: var(--tex     color            3);
   (--spacing-padding: var                 ;
   lay: blockisp           d         pdown a {
  .user-dro         
                  
        }          e;
 .3s easn 0fadeInDowation:      anim       k;
        lay: bloc    disp                en {
down.op.user-drop                          
             }
         y: none;
  displa                  00;
-index: 10       z           px;
  00min-width: 2                    -lg);
ar(--shadowx-shadow: v       bo    
         x; 6pius:rder-rad        bo          ;
  lor)der-cor(--borvax solid er: 1pord     b               g-color);
: var(--bckground       ba            ight: 0;
   r              
     top: 100%;            
       bsolute;on: a    positi                
wn {r-dropdo  .use       
                    
     }          olor);
    -c--primaryolor: var(der-c         bor     
      lor: white;     co          );
     -color-primaryund: var(-    backgro           ver {
     ho.user-btn:              
           }
                       );
ansitiontron: var(--    transiti          2);
      pacing-ap: var(--s  g                
  enter;s: citem   align-                 : flex;
splay    di           nter;
     ursor: poi c                   ;
 6pxadius:    border-r              3);
  ng-(--spacicing-2) varar(--spapadding: v          
          rimary);var(--text-p   color:                  er-color);
bord(--solid varder: 1px bor            
        face-color);urnd: var(--skgroubac               tn {
     ser-b    .u              
           }
               
    elative;osition: r    p                
menu { .user-                
          
          }           underline;
ation: orext-dec          t      
    over {links a:h    .auth-           
        
             }          2);
  -spacing-tom: var(-rgin-bot      ma         lock;
     splay: b          di         
 nt-size-sm);var(--fot-size: on         f
           : none;ontitext-decora                 r);
   primary-colovar(-- color:            {
         a links   .auth-               
              }
            ng-4);
    --spaci-top: var(    margin            r;
    n: centet-alig    tex                nks {
    .auth-li         
           
               }         dary);
con--text-se: var(or       col           g-3);
  --spacinng: 0 var(addi  p            ;
      -bg-color)und: var(-backgro                 n {
   vider spa .auth-di                  
               }
              r);
border-colo: var(--ackground      b            
  : 1px;      height              right: 0;
                ft: 0;
      le               ;
    top: 50%           
        ute;solon: ab      positi            
  ';ntent: '          co         before {
 der::uth-divi   .a           
                }
                tive;
  lan: re     positio            ) 0;
   -4ingvar(--spacargin:            m        center;
  ign:text-al                 {
   er  .auth-divid         
                }
             
         ite;or: whcol          
           #ef4444;ackground:  b                
  {danger .auth-btn.              
                 }
                 : #3367d6;
ndackgrou          b          le:hover {
tn.goog    .auth-b               
            }
               
  or: white;   col         ;
        nd: #4285f4kgrou        bac          
  n.google {-bt  .auth               
                 }
             olor);
 -corderolid var(--b s border: 1px                  rimary);
 xt-p var(--ter:        colo          r);
  colo-surface-ound: var(-     backgr          ary {
     ndbtn.seco      .auth-
                       
      }         
    nd: #b91c1c; backgrou                  
  {ary:hover.primh-btn   .aut              
     
               }    e;
       olor: whit    c       
         or);-primary-colround: var(-ckg  ba       
           {primary   .auth-btn.     
                             }
     ;
       g-2)r(--spacinttom: vaargin-bo        m      
      2);-spacing-r(- va      gap:     ;
         centertent: y-conif  just              r;
    enteems: cign-it        al            ex;
play: fl        dis         ion);
   nsittraar(-- vtransition:                   nter;
 poi  cursor:                   
ight: 600;    font-we            
    ;adius: 6pxrder-r bo           
        : none;  border             3);
     ing-ac--spvar(ng: di        pad         100%;
    th:       wid           
  n {-btuth         .a   
                    }
           uto;
     th: a  wid           {
        ckbox"]ype="chel input[theckbox-labe          .c    
                
            }
      ter;oinr: p     curso          
     spacing-2);gap: var(--                   ;
 ms: centergn-ite       ali           ex;
  ay: fl  displ            el {
      eckbox-lab   .ch         
                 }
                  
 , 0.1); 38, 38x rgba(220, 3phadow: 0 0 0    box-s             olor);
   y-c(--primarvarcolor:  border-                  e;
 : non  outline                  ocus {
put:form-group in      .f           
                   }
           se);
 ze-ba--font-si: var(ont-size    f             ry);
   rimaar(--text-polor: v    c               r);
 surface-colo(--ground: var   back             
    dius: 6px;  border-ra            );
      r-colorr(--bordeid vaer: 1px solord   b                 g-3);
r(--spacinadding: va      p           0%;
    width: 10                   {
lect rm-group se  .fo         
     input,form-group     .      
                              }
        imary);
xt-pr var(--telor:          co        
  t: 500;weigh    font-          );
      cing-1pa-stom: var(-n-bot    margi              ock;
  display: bl                  l {
  m-group labe .for              
               }
                 g-3);
 pacinap: var(--s           g        1fr;
  umns: 1frte-coltemplagrid-                   ;
 iddisplay: gr                    {
 .form-row                      
  
             }    
       4);(--spacing--bottom: var      margin              m-group {
       .for
                           }
         ;
     pacing-4)ing: var(--s padd                
   uth-form {    .a                   
       }
              ng-2);
    spaci: var(--     padding               inter;
 cursor: po          
         ary);t-secondexvar(--t    color:         
        t-size-xl);: var(--font-size       fon   
          er: none;      bord              d: none;
ounckgr     ba               ose {
uth-cl  .a              
                 }
            
   r;ms: centegn-ite  ali                  n;
ce-betweent: spaconte  justify-            
      ex;display: fl            );
        colorr-borded var(--1px solim: tor-botrde         bo      );
     -spacing-4ng: var(-paddi                   der {
   .auth-hea                        
 }
              px;
       idth: 600max-w                tent {
    ile-conof .pr               
                       }
 ;
        g)adow-lr(--shvadow:    box-sha         
        ow-y: auto;fl    over           90vh;
     height:        max-            00px;
 x-width: 4       ma    
         idth: 90%;      w              px;
 12er-radius:  bord                 -color);
 d: var(--bg backgroun            ;
       relative  position:                 nt {
  teuth-con.a                   
                  }
           0, 0.5);
  rgba(0, 0, background:                  ht: 100%;
     heig            100%;
    h:   widt           ;
       t: 0     lef         : 0;
      op    t                ute;
tion: absol     posi               y {
la  .auth-over              
              }
               center;
   ent: justify-cont                   r;
 ms: cente-itelign       a          
   play: flex;     dis               
ex: 10000; z-ind                 t: 100%;
   heigh                   dth: 100%;
        wi           
 0;     left:                top: 0;
                ed;
    ion: fix   posit                
 dal {auth-mo   .            
 e>   <styl`
         st styles = on{
        ces() tyldAuthS ad  
    
   }s();
  leSty.addAuth       this
 thHTML);nd', au'beforeeHTML(Adjacenty.insertent.bod      docum    
            `;
v>
          </diiv>
      </d         
     div>      </          v>
    /di <                      iv>
      </d                       /button>
         <                   لحساب
       حذف ا                         
        )">teAccount("auth.dele" onclick=r dangeth-btnass="au<button cl                             v>
       </di                          label>
            </                         ي</span>
 لكترونلبريد الإت اn>إشعارا       <spa                          ">
       sicationil-notifd="emabox" ipe="check<input ty                                  
      ">-label="checkbox class <label                                  -item">
 tingclass="set       <div                          iv>
      </d                     >
        </select                                n>
 ioيورو</opt"EUR">tion value=op    <                                n>
    /optioي<ولار أمريكSD">د"Un value=    <optio                           >
         on/opti مصري<>جنيهue="EGP"tion val        <op                             ency">
   r-currid="useelect      <s                            abel>
   l>العملة</l       <labe                           ">
  ting-itemclass="set       <div                 
          </div>                           elect>
        </s                             tion>
   sh</opglie="en">Enoption valu         <                               ion>
ية</opt">العربarlue="ption va      <o                                 ">
 nguagelar-sect id="u  <sele                            
      ة</label>bel>اللغ<la                            
        g-item">inettss="sclaiv         <d                        ">
ngs-listti class="set     <div                  nt">
     nteco"tab-lass= c"settings" <div id=                      </div>
                   n>
       </butto                       د
     عنوان جدي"></i> إضافةas fa-plus class="f<i                               ress()">
 h.addAddlick="autary" onccondn se"auth-btclass=    <button                        </div>
                        >
     ere --ded hll be loadresses wi<!-- Ad                               ">
 sesser-addres id="u-list"esssdre"addiv class=    <                       ontent">
 ss="tab-cs" claresse"add<div id=                     div>
             </      
              </div>                  >
    --loaded here will be -- Orders      <!                       >
    ser-orders"t" id="uers-lisrdss="oiv cla       <d                 t">
    "tab-conten=sslay" cistorid="order-h   <div                     div>
          </              
     </form>                n>
        uttoرات</b>حفظ التغيي"n primaryuth-btss="a" cla"submitpe=ton tyut        <b                          </div>
                             ">
 one"profile-ph" id= type="telnput    <i                               ف</label>
  الهاتabel>رقم       <l                       
      ">"form-groups=iv clas<d                               
  </div>                               donly>
il" rea"profile-emad="email" ie=nput typ<i                          
          abel>ني</lد الإلكتروabel>البري          <l                       ">
   -groupformass=" cliv          <d                  v>
         </di                          v>
   </di                         
         -lastName">le" id="profi="text<input type                                        >
elير</labم الأخ>الاس      <label                          
        up">"form-grodiv class=   <                               div>
   </                                ">
   tNamefile-firsid="pro" ype="text  <input t                              
        </label>لاسم الأول <label>ا                                     
  ">up-gro"formiv class=    <d                               
 form-row">lass="div c      <                         rm">
 profile-foform id="   <                      ">
   ve acti"tab-contentass=le-info" clrofidiv id="p       <            
     ea">e-content-ar="profil  <div class             >
            </div        ton>
     عدادات</butالإttings">="sea-tabtn" dattab-bss="<button cla                    
    /button>ناوين<لعs">اddresse"aata-tab=ab-btn" ds="tton clas<but                      /button>
  يخ الطلبات<">تارrytoder-his"orab=n" data-tbtlass="tab- c  <button                 tton>
     ة</buلومات الشخصي">المعrofile-info"pab=a-te" dativ"tab-btn act class=tton       <bu               bs">
  e-tass="profil<div cla                 
       </div>              button>
  </                      ></i>
  es"-tim fas="fas  <i clas                         )">
 odal''profile-mloseModal("auth.conclick=h-close" "auttton class=<bu                  /h2>
      الشخصي<">الملف lerofi"auth.pte=laa-transdat        <h2                 -header">
"auth <div class=               ">
    ntnterofile-cont ptecon"auth-ass= cl<div           /div>
     )"><l'oda-mile('profloseModal"auth.ck=" onclicverlayss="auth-odiv cla <               one;">
play: nis="ddal" style="auth-mo" classle-modal"profi  <div id=     -->
     le Modal ser Profi- U  <!-       iv>

           </d    </div>
         
       orm>     </f         
      /div>          <        </a>
                                  خول
ل الدجيعودة لتسال                                
ogin">th.backToLate="autransl" data-')modal('login-dalth.showMo"auclick=f="#" on     <a hre                   ks">
    s="auth-lin  <div clas                   on>
   /butt    <                
    ط الاستعادةسال راب إر                          et">
 sendRes"auth.slate=-tran" databtn primarylass="auth-" c"submitton type=   <but                        </div>
                    quired>
 ail" re"forgot-emd=="email" it type       <inpu                   el>
  كتروني</labلإلالبريد اl">auth.emai="slatea-trandat  <label                         roup">
  m-g"foriv class= <d                      >
 h-form"lass="aut cgot-form"="for    <form id            /div>
      <        
          n>   </butto                    s"></i>
 meti fa-lass="fas      <i c                      modal')">
al('forgot-uth.closeModclick="aose" on"auth-clss=la <button c                  
     h2>مة المرور</">استعادة كلetPasswordes.rauthanslate="tr   <h2 data-                     ">
auth-headerass="    <div cl              nt">
  uth-contess="a <div cla               iv>
')"></dorgot-modalseModal('fcloauth.ick="" onclh-overlay class="aut    <div            ne;">
ay: noyle="displstmodal" "auth-al" class=t-mod"forgodiv id=        <
    rd Modal -->sswoForgot Pa<!--            v>

       </di    div>
     </            m>
 /for      <             iv>
         </d                    </a>
                  
      الدخولالفعل؟ سجل اب ب    لديك حس                  
          ount">hasAccte="auth.-transla datan-modal')"logi.showModal('="authlickncref="#" oa h          <                ks">
  ="auth-lin  <div class                  
    /button>       <                 n>
بجوجل</spaجيل r">التسoogleRegistete="auth.gta-translaan dasp      <                     "></i>
  fa-googleabs="f <i clas                         ">
  Google()rWithauth.registe"ick=oogle" onclth-btn glass="auton" c="but<button type                        </div>
                      span>
  h.or">أو</te="autta-translapan da <s                     r">
      vides="auth-div clas  <di                      tton>
      </bu                 الحساب
 إنشاء                        r">
     gisteth.re"auranslate=a-ty" datprimarn btth- class="aumit"ype="subbutton t      <                 
     </div>                el>
           </lab                 
    كام</span>الشروط والأحأوافق على rms">eTeagreth.slate="autranata- <span d                              
 " required>e-termsre id="agckbox""cheut type=np<i                           ">
     box-labelheckss="cabel cla        <l            
        orm-group"> class="f      <div                  >
     </div                 ired>
  rd" requPasswoster-confirm="regiid"password" input type=  <                          /label>
لمرور<مة اد كلword">تأكيassfirmPuth.cone="aranslatbel data-t <la                      ">
     upform-groass="iv cl <d               
              </div>                >
  ngth="6"minle" required ordr-passwgisted="re" iasswordt type="p   <inpu                        
 ور</label>مة المر">كلssword.pa="authanslatetrabel data-<l                     
       roup">ass="form-g   <div cl                     </div>
                       d>
  requireone""register-ph=="tel" id<input type                        
    </label>الهاتف">رقم .phonee="authranslatlabel data-t       <               >
      rm-group" class="fo  <div              
        /div>           <     >
        redequiil" rister-ema id="regail"ype="eminput t   <                 
        l>وني</labeإلكتر">البريد الth.emailslate="auel data-tran  <lab                      ">
    group"form-ass=cliv    <d               v>
         </di                   /div>
     <                        ed>
 quir" reastNameister-lreg" id="="textpe<input ty                                l>
ير</labe الأخ">الاسم.lastNameslate="authel data-tran        <lab                       -group">
 ass="form cl      <div                    
     </div>                    d>
     reme" requi-firstNa"registerxt" id=t type="te      <inpu                     >
     أول</label ال">الاسمth.firstNamee="au-translat <label data                           >
    orm-group""fclass=div       <                 
     >rm-row" class="fo  <div                   ">
   mth-forclass="auter-form" "regisform id=   <            div>
             </          /button>
         <           </i>
      -times">"fas faclass=i         <                    dal')">
er-moegistdal('rh.closeMonclick="autose" o"auth-cln class=      <butto                
  اب جديد</h2>نشاء حسter">إisth.rege="auranslat data-t        <h2          
      der">"auth-headiv class=     <              nt">
 "auth-conte class=     <div     v>
      "></dil')ter-modaegisseModal('r"auth.cloy" onclick=lah-overutass="aiv cl         <d  e;">
     splay: nonyle="distuth-modal" ass="acl-modal" sterd="regi     <div i       Modal -->
ter -- Regis        <!

       </div>       /div>
   <               m>
    </for                  </div>
                      </a>
                    ر؟
        رومة الم كل     نسيت                          ">
 otauth.forglate="ata-trans dodal')"rgot-mwModal('foh.shock="autoncli="#" <a href                    
         </a>                       ن
    ب؟ سجل الآحسا ليس لديك                               count">
 .noAcslate="auth" data-transter-modal')('regih.showModalautlick=""#" onc <a href=                         nks">
  -liclass="auth<div                        /button>
        <                ل</span>
 ول بجوجgle">الدخauth.goote="data-transla      <span                  ></i>
     "b fa-google="fai class          <               le()">
   hGoogloginWitck="auth.oncli" gletn gooth-b="au" classtonpe="butn ty<butto                     div>
           </       
         و</span>th.or">أaue="a-translatat<span d                         
   ">auth-dividerass="v cl     <di                   
ton>       </but            ول
      تسجيل الدخ                       
    >login"h.utnslate="a data-tratn primary"auth-b class=""submit"ton type=<but                         </div>
                      
 abel>    </l                     >
   كرني</spanmber">تذh.remeaut"-translate=n data    <spa                          ">
  er-meemembid="r" ckbox="chet type     <inpu                        abel">
   kbox-lec class="ch <label                           p">
ouorm-gr"fass=     <div cl               >
      </div                ed>
      d" requirassword="login-p" iwordype="pass  <input t                          bel>
لمرور</laord">كلمة اauth.passwe="a-translatl datlabe <                     p">
      form-grous="as     <div cl              div>
        </               ed>
      iril" requ="login-ema" idpe="email  <input ty                        abel>
  ني</lالإلكترو">البريد th.email="auatetranslel data-     <lab                    up">
   orm-groass="fv cl   <di            >
         form"lass="auth-" cogin-formrm id="l       <fo      >
       /div         <        
   >ton   </but                  "></i>
   s fa-timesass="fa   <i cl                       ">
  dal')gin-mooseModal('lok="auth.clclicse" onauth-clon class="  <butto            
          /h2>ل الدخول<تسجيuth.login">late="atrans  <h2 data-               ">
       auth-headerdiv class="      <          nt">
    contess="auth-   <div cla      v>
       ')"></diogin-modalal('lh.closeModnclick="aut orlay"h-ove"aut <div class=       
        y: none;">="displaleodal" sty="auth-mlass" calin-mod"logiv id=  <d          Modal -->
in Log     <!-- 
        `TML = const authH     
  als() {AuthModte 
    crea  }
   h();
  pGoogleAutetu    this.s    );
eAuthModals(atis.cre      theners();
  ntLists.setupEve thi    ion();
   ckSess   this.che    ) {
  
    init( }
     it();
  this.in