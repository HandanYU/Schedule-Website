<?php

namespace app\index\controller;
use think\Request;
use app\index\model\mydb;
class School{
    public function findEmail(){
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $t=new mydb;
        $result = $t->findEmail($schoolName);
        if ($result==NULL){
            return json_encode($result);
        }else{
            return json_encode($result);
        }
    }
    public function isScheduled()
    {
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $t=new mydb;
        $result = $t->isScheduled($schoolName);
        if ($result==NULL){
            return 'true';
        }
        else{
            return 'false';
        }
        
    }
    # Requirement 2 - School Registration
    # http://localhost:8088/public/index.php/index/School/schoolregister?schoolName=handan&schoolContactName=handan3&schoolContactNumber=123456&email=m133@163.com&password=1234
    # schoolregister: schoolName,schoolContactName,schoolContactNumber,email,password
    public function schoolregister()
    {
        $r=Request::instance();
          $schoolName=$r->param('schoolName');
          $schoolContactName=$r->param('schoolContactName');
          $schoolContactNumber=$r->param('schoolContactNumber');
          $email=$r->param('email');
          $password=$r->param('password');
          $t=new mydb;
          $result = $t->schoolregister($schoolName,$schoolContactName,$schoolContactNumber,$email,$password);
          if ($result==true){
              return json_encode($result);
          }else{
            return json_encode($result);
          }
    }

    # school login
    # http://localhost:8088/public/index.php/index/School/schoollogin?email=m133@163.com&password=1234
    # schoollogin: email,password
    public function schoolNameDup()
    {
        $r=Request::instance();
        $email=$r->param('email');
        $t=new mydb;
        $list=$t->schoolNameDup($email);
        if ($list==NULL){
            return 'true';
        }else{
            return 'false';
        }
    }
    public function schoollogin()
    {
        $r=Request::instance();
        $email=$r->param('email');
        $password=$r->param('password');
        $t=new mydb;
        $list=$t->schoollogin($email,$password);
        if($list==NULL){
          return "false";
        }else{
             return json_encode($list);      
        }
    }

    # add school interest basic info
    #http://localhost:8088/public/index.php/index/School/addInterest?schoolName=HANDAN&address=shaoxingchengnan&city=shaoxing&state=zhejiang&postalCode=1234&schoolType=Host&message=aaaa
    # http://localhost:8088/public/index.php/index/School/addInterest?schoolName=diana&address=hangzhoubinjiang&city=hangzhou&state=zhejiang&postalCode=1234&schoolType=Visit&message=bbbbb
   # addInterest:schoolName,address,city,state,postalCode,schoolType,message
    public function addInterest()
    {
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $address=$r->param('address');
        $city=$r->param('city');
        $state=$r->param('state');
        $postalCode=$r->param('postalCode');
        $schoolType=$r->param('schoolType');
        $message=$r->param('message');
        $t=new mydb;
       $t->addInterest($schoolName,$address,$city,$state,$postalCode,$schoolType,$message);
        if ($t->addInterest($schoolName,$address,$city,$state,$postalCode,$schoolType,$message)){
            return "success";      
        }
        return "false";      
    }

    # add school further info according to the type of school
    ## host school
    # http://localhost:8088/public/index.php/index/School/hostSchool?schoolName=HANDAN&isSecure=yes&parkSpace=10&openArea=20
    # hostSchool:
    public function hostSchool()
    {
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $isSecure=$r->param('isSecure');
        $parkSpace=$r->param('parkSpace');
        $openArea=$r->param('openArea');
        
        $t=new mydb;
        if ($t->hostSchool($schoolName,$isSecure,$parkSpace,$openArea)){
            return "success";
        }
        return "false";
    }
    // ## visit school
    // #http://localhost:8088/public/index.php/index/School/visitSchool?schoolName=diana&visitSchoolName=gogo&nearestHostSchoolName=HANDAN&distance=210
    public function visitSchool(){
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $visitSchoolName=$r->param('visitSchoolName');
        $nearestHostSchoolName=$r->param('nearestHostSchoolName');
        $distance=$r->param('distance');
        $t=new mydb;
        if ($t->visitSchool($schoolName,$visitSchoolName,$nearestHostSchoolName,$distance)){
            return "success";
        }
        return "false";
    }





    # Requirement 8 – Choosing a time from the Schedule for a School
    ## show basic schedule info to school representatives
    ## http://localhost:8088/public/index.php/index/School/showSchedule?schoolName=diana
    # showSchedule: schoolName
    public function showSchedule()
    {
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $t=new mydb;
        $result=$t->showSchedule($schoolName);
        if ($result==NULL){
            return "false";
        }
        return json_encode($result);
    }
    ## choose a certain time
    # http://localhost:8088/public/index.php/index/School/chooseDate?schoolName=HANDAN&startDate=2020-03-04&endDate=2021-02-01&isSpecial=No
    # chooseDate:schoolName,startDate,endDate
    public function chooseDate()
    {
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $startDate=$r->param('startDate');
        $endDate=$r->param('endDate');
        $isSpecial=$r->param('isSpecial');
        $totalStudent=$r->param('totalStudent');
        $totalCost=$r->param('totalCost');

        $t=new mydb;
        if ($t->chooseSchedule($schoolName,$startDate,$endDate,$isSpecial,$totalStudent,$totalCost)){
            return "success";
        }
        return "false";
    }
    ## Requirement 9 – Cancelling a Scheduled Visit for the Technology Bus
    # http://localhost:8088/public/index.php/index/School/cancelInterest?id=103
    # cancelInterest:schoolName
    #http://localhost:8088/public/index.php/index/School/
    public function doCancel(){
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $t=new mydb;
        $res = $t->doCancel($schoolName);
        if ($res==NULL){
            return "false";
        }
        else{
            return "true";
        }
    }
    public function cancelInterest()
    {
        $r=Request::instance();
        $schoolName=$r->param('schoolName');
        $t=new mydb;
        if ($t->cancelInterest($schoolName)){
            return "success";
        }
        return "false";
    }
}

?>
