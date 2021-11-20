<?php
namespace app\index\model;
use think\Model;
use think\Db;
/**
 * school db
 */

class mydb extends Model
{
	public function findEmail($schoolName)
	{
		$t=Db::query("select email from SchoolRegist where (schoolName=:u)",['u'=>$schoolName]);
		return $t;
	}
	public function isScheduled($schoolName)
	{
		$t=Db::query("select * from SchoolInterest where (schoolName=:u) and isSpecial is not NULL",['u'=>$schoolName]);
		return $t;
	}
	//school regist
	public function schoolregister($schoolName,$schoolContactName,$schoolContactNumber,$email,$password)
	{
		$t=Db::query("select * from SchoolRegist where (schoolName=:u)",['u'=>$schoolName]);
		if($t==NULL){
			Db::execute("insert into SchoolRegist (schoolName,schoolContactName,schoolContactNumber,email,password) 
			values(:a,:b,:c,:d,:e)",['a'=>$schoolName,'b'=>$schoolContactName,'c'=>$schoolContactNumber,'d'=>$email,'e'=>$password]);
			return true;
		}
		return false;
		
	}
	//
	public function schoolNameDup($email){
		$t = Db::query("select schoolName from SchoolRegist where (email=:u)",['u'=>$email]);
		return $t;
	}
	// schoollogin
	public function schoollogin($email,$password)
	{	
		$t = Db::query("select schoolName from SchoolRegist where (email=:u) and (password=:v)",['u'=>$email,'v'=>$password]);
		return $t;
	}
	// add school interest basic info
	public function addInterest($schoolName,$address,$city,$state,$postalCode,$schoolType,$message)
	{
		$t=Db::query("select * from SchoolInterest where (schoolName=:u)",['u'=>$schoolName]);
		if($t==NULL){
			Db::execute("insert into SchoolInterest (schoolName,address,city,state,postalCode,schoolType,message) 
			values(:a,:b,:c,:d,:e,:f,:g)",['a'=>$schoolName,'b'=>$address,'c'=>$city,'d'=>$state,'e'=>$postalCode,'f'=>$schoolType,'g'=>$message]);
			return true;
		}
		else{
			Db::execute("update SchoolInterest set address=:a,city=:b,state=:c,postalCode=:d,schoolType=:e, message=:f where (schoolName=:u)",
			['a'=>$address,'b'=>$city,'c'=>$state,'d'=>$postalCode,'e'=>$schoolType,'f'=>$message,'u'=>$schoolName]);
			return true;
		}
		return false;
	}
	// add host school further info
	public function hostSchool($schoolName,$isSecure,$parkSpace,$openArea)
	{
		Db::execute("update SchoolInterest set isSecure=:a,parkSpace=:b,openArea=:c where (schoolName=:u)",
		['a'=>$isSecure,'b'=>$parkSpace,'c'=>$openArea,'u'=>$schoolName]);
		return true;
	}
	// add visit school further info
	public function visitSchool($schoolName,$visitSchoolName,$nearestHostSchoolName,$distance)
	{
		Db::execute("update SchoolInterest set visitSchoolName=:a,nearestHostSchoolName=:b,distance=:c where (schoolName=:u)",
		['a'=>$visitSchoolName,'b'=>$nearestHostSchoolName,'c'=>$distance,'u'=>$schoolName]);
		return true;
	}
	// choose schedule
	public function chooseSchedule($schoolName,$startDate,$endDate,$isSpecial,$totalStudent,$totalCost)
	{
		$t=Db::query("select * from SchoolInterest where (schoolName=:v)",['v'=>$schoolName]);
		if($t!=NULL){
			Db::execute("update SchoolInterest set startDate=:a,endDate=:b,isSpecial=:c,totalStudent=:d,totalCost=:f where (schoolName=:v)",
		['a'=>$startDate,'b'=>$endDate,'c'=>$isSpecial,'d'=>$totalStudent,'f'=>$totalCost,'v'=>$schoolName]);
		return true;
		}
		return false;
	}
	// show schedule basic info
	public function showSchedule($schoolName)
	{
		$result = Db::query("select id, schoolName, schoolType, startDate, endDate, isSpecial,totalStudent,totalCost from SchoolInterest where (schoolName=:u)",['u'=>$schoolName]);
		return $result;
	}
	//doCancel
	public function doCancel($schoolName)
	{
		$result = Db::query("select isSpecial from SchoolInterest where (schoolName=:u)",['u'=>$schoolName]);
		return $result;
	}
	// cancelInterest
	public function cancelInterest($schoolName)
	{
		Db::execute("delete from SchoolInterest where (schoolName=:u) and startDate is not NULL ",['u'=>$schoolName]);
		return true;
	}
        ###########################################################	

// adminLogin
	public function adminlogin($email,$password)
	{
		$t = Db::query("select * from AdminLogin where (email=:u) and (password=:v)",['u'=>$email,'v'=>$password]);
		if ($t!=NULL){
			return true;
		}
		return false;
	}
// Requirement 5 – Viewing all the Expression of Interests Received
	public function viewInterest()
	{
		$result = Db::query("select schoolName, schoolType from SchoolInterest where startDate is NULL");
		return $result;
	}


// Requirement 6 – Rostering a Schedule for a School
// show detail
	public function showDetail($index)
	{
		$result = Db::query("select id, schoolName, schoolType, startDate, endDate from SchoolInterest where startDate is NULL limit :a,1",['a'=>$index]);
		return $result;
	}
// set schedule
	public function setSchedule($schoolName,$startDate,$endDate)
	{
		$t=Db::query("select * from SchoolInterest where (schoolName=:v)",['v'=>$schoolName]);
		if($t!=NULL){
			Db::execute("update SchoolInterest set startDate=:a,endDate=:b where (schoolName=:v)",
		['a'=>$startDate,'b'=>$endDate,'v'=>$schoolName]);
		return true;
		}
		return false;
	}
}

